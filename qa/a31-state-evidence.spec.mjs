import { chromium } from 'playwright';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
let failed = false;

async function run(name, fn) {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    failed = true;
    console.error(`FAIL ${name}`);
    console.error(error);
  }
}

await run('validation focuses first invalid field and exposes aria-invalid', async () => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${baseURL}/demo-state-lab.html`, { waitUntil: 'domcontentloaded' });
  await page.locator('#labSubmit').click();
  if ((await page.locator('#labEmail').getAttribute('aria-invalid')) !== 'true') throw new Error('Email should be marked invalid');
  if ((await page.locator('#labCompany').getAttribute('aria-invalid')) !== 'true') throw new Error('Company should be marked invalid');
  const activeId = await page.evaluate(() => document.activeElement?.id);
  if (activeId !== 'labEmail') throw new Error(`Expected focus on labEmail, got ${activeId}`);
  await page.close();
});

await run('failed request preserves data and retry succeeds', async () => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${baseURL}/demo-state-lab.html`, { waitUntil: 'domcontentloaded' });
  const email = 'alex@example.com';
  const company = 'Northstar Labs';
  await page.locator('#labEmail').fill(email);
  await page.locator('#labCompany').fill(company);
  await page.locator('#labSubmit').click();
  await page.getByText('Request could not be sent.', { exact: true }).waitFor({ state: 'visible' });
  if ((await page.locator('#labEmail').inputValue()) !== email) throw new Error('Email was not preserved after failure');
  if ((await page.locator('#labCompany').inputValue()) !== company) throw new Error('Company was not preserved after failure');
  await page.locator('#retryRequest').click();
  await page.getByText('Demonstration request completed.', { exact: true }).waitFor({ state: 'visible' });
  if ((await page.locator('#labEmail').inputValue()) !== email) throw new Error('Email changed after retry');
  if ((await page.locator('#labCompany').inputValue()) !== company) throw new Error('Company changed after retry');
  await page.close();
});

await run('loading blocks duplicate submit', async () => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${baseURL}/demo-state-lab.html`, { waitUntil: 'domcontentloaded' });
  await page.locator('#labEmail').fill('alex@example.com');
  await page.locator('#labCompany').fill('Northstar Labs');
  await page.locator('#labSubmit').click();
  if (!(await page.locator('#labSubmit').isDisabled())) throw new Error('Submit should be disabled during loading');
  if ((await page.locator('#stateLabForm').getAttribute('aria-busy')) !== 'true') throw new Error('Form should expose aria-busy while loading');
  await page.close();
});

await run('mobile state lab has no horizontal overflow', async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${baseURL}/demo-state-lab.html`, { waitUntil: 'domcontentloaded' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) throw new Error(`Horizontal overflow: ${overflow}px`);
  if (!(await page.locator('#labSubmit').isVisible())) throw new Error('Submit action not visible on mobile');
  await page.close();
});

await browser.close();
if (failed) process.exit(1);
