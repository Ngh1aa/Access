/**
 * ACCESS — Main Application Logic
 * Sticky Navigation, Mobile Drawer, Demo Modal, World Clock Ticker, Scenario Tabs
 */

(function () {
  'use strict';

  // --- 0. Secure Pixel Infrastructure visual layer ---
  const pixelThemeStyles = [
    'assets/css/pixel-tech.css',
    'assets/css/pixel-tech-hardening.css'
  ];

  pixelThemeStyles.forEach((href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = href;
    stylesheet.dataset.accessTheme = 'secure-pixel-infrastructure';
    document.head.appendChild(stylesheet);
  });
  document.documentElement.classList.add('pixel-tech-ui');

  // --- 1. Sticky Header & Blur Effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('site-header-scrolled');
      } else {
        header.classList.remove('site-header-scrolled');
      }
    }, { passive: true });
  }

  // --- 2. Mobile Navigation Toggle ---
  const hamburger = document.getElementById('navHamburger');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  if (hamburger && mobileDrawer) {
    function toggleMenu(forceClose = false) {
      const isOpen = forceClose ? false : !mobileDrawer.classList.contains('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        mobileDrawer.classList.add('is-open');
        document.body.classList.add('modal-open');
      } else {
        mobileDrawer.classList.remove('is-open');
        document.body.classList.remove('modal-open');
      }
    }

    hamburger.addEventListener('click', () => toggleMenu());

    // Close when clicking any link inside drawer
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(true));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        toggleMenu(true);
      }
    });
  }

  // --- 3. Active Link Highlighting ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- 4. Interactive Enterprise Demo Modal ---
  const demoModal = document.getElementById('demoModal');
  const openDemoBtns = document.querySelectorAll('[data-open-demo-modal]');
  const closeDemoBtns = document.querySelectorAll('[data-close-demo-modal]');

  function openDemoModal() {
    if (!demoModal) return;
    demoModal.classList.add('is-active');
    demoModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const firstInput = demoModal.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeDemoModal() {
    if (!demoModal) return;
    demoModal.classList.remove('is-active');
    demoModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  openDemoBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openDemoModal();
  }));

  closeDemoBtns.forEach(btn => btn.addEventListener('click', closeDemoModal));

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) closeDemoModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && demoModal.classList.contains('is-active')) {
        closeDemoModal();
      }
    });

    // Demo Form Handling
    const demoForm = document.getElementById('demoForm');
    const demoSuccessView = document.getElementById('demoSuccessView');

    if (demoForm && demoSuccessView) {
      demoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = demoForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Scheduling Demo...';
        }

        setTimeout(() => {
          demoForm.style.display = 'none';
          demoSuccessView.style.display = 'block';
        }, 600);
      });
    }
  }

  // --- 5. World Clock Realtime Updater ---
  function updateWorldClocks() {
    const clockElements = document.querySelectorAll('[data-timezone]');
    if (!clockElements.length) return;

    clockElements.forEach(el => {
      const tz = el.getAttribute('data-timezone');
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(new Date());
        el.textContent = timeStr;
      } catch (err) {
        // Fallback gracefully
      }
    });
  }
  updateWorldClocks();
  setInterval(updateWorldClocks, 30000);

  // --- 6. Scenario Switcher (Built for moments that matter) ---
  const scenarioTabs = document.querySelectorAll('[data-scenario-tab]');
  const scenarioPanels = document.querySelectorAll('[data-scenario-panel]');

  if (scenarioTabs.length && scenarioPanels.length) {
    scenarioTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-scenario-tab');
        scenarioTabs.forEach(t => t.classList.remove('active'));
        scenarioPanels.forEach(p => {
          p.style.display = 'none';
          p.classList.remove('active');
        });

        tab.classList.add('active');
        const targetPanel = document.querySelector(`[data-scenario-panel="${targetId}"]`);
        if (targetPanel) {
          targetPanel.style.display = 'grid';
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // --- 7. Progressive Scroll Reveal Animation ---
  if ('IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.signature-bar, .story-grid-2col, .journey-timeline-card, .system-diagram-card, .zone-matrix-grid, .reader-sim-container, .scenario-panels-wrapper, .site-locations-strip, .trust-badges-grid'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach(el => observer.observe(el));
  }

})();
