const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const drawer = $('#alertDrawer');
const backdrop = $('#drawerBackdrop');
const toast = $('#toast');
let toastTimer;
function showToast(message){ $('#toastText').textContent=message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('show'),2600); }
function openDrawer(){drawer.classList.add('open');backdrop.classList.add('open');document.body.style.overflow='hidden';}
function closeDrawer(){drawer.classList.remove('open');backdrop.classList.remove('open');document.body.style.overflow='';}
$('#inspectBtn').addEventListener('click',openDrawer); $('#closeDrawer').addEventListener('click',closeDrawer); backdrop.addEventListener('click',closeDrawer);
$('#closeAlert').addEventListener('click',()=>{$('#alertBanner').style.display='none';showToast('Alert archived from overview');});
$('#revokeBtn').addEventListener('click',()=>{closeDrawer();showToast('Session revoked and added to audit log');});
$('#dismissBtn').addEventListener('click',()=>{closeDrawer();$('#alertBanner').style.display='none';showToast('Alert marked as reviewed');});
$('#exportBtn').addEventListener('click',()=>showToast('Security report prepared for download'));
$('#addBtn').addEventListener('click',()=>showToast('Invite flow opened'));
$('#newRoleBtn').addEventListener('click',()=>showToast('New role draft created'));
$('#filterBtn').addEventListener('click',()=>showToast('Showing 2 active filters: resource + state'));
$('#viewMatrix').addEventListener('click',()=>document.querySelector('.matrix-card').scrollIntoView({behavior:'smooth',block:'center'}));
$$('.toggle').forEach(btn=>btn.addEventListener('click',()=>{$$('.toggle').forEach(b=>b.classList.remove('active'));btn.classList.add('active');showToast(btn.textContent.trim()+' view selected');}));
$$('.permission').forEach(btn=>btn.addEventListener('click',()=>{if(btn.classList.contains('deny')){btn.className='permission allow';btn.innerHTML='✓<span>Explicit</span>';showToast('Permission changed to explicit allow');}else if(btn.classList.contains('allow')){btn.className='permission deny';btn.innerHTML='—<span>Denied</span>';showToast('Permission denied for this role');}else{showToast('Inherited access comes from Platform baseline');}}));
$('#matrixSearch').addEventListener('input',(e)=>{const q=e.target.value.toLowerCase();$$('#permissionRows tr').forEach(row=>row.style.display=row.dataset.resource.includes(q)?'':'none');});
$('#mobileMenu').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
$$('.nav-item').forEach(item=>item.addEventListener('click',()=>{ $$('.nav-item').forEach(i=>i.classList.remove('active')); item.classList.add('active'); $('#breadcrumbCurrent').textContent=item.textContent.replace(/[0-9]/g,'').trim(); $('#sidebar').classList.remove('open'); if(item.dataset.view!=='overview') showToast(item.textContent.replace(/[0-9]/g,'').trim()+' view is ready for review'); }));
document.addEventListener('keydown',(e)=>{if(e.key==='Escape')closeDrawer();if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#matrixSearch').focus();}});
$$('.row-menu').forEach(btn=>btn.addEventListener('click',()=>showToast('Resource actions opened')));
