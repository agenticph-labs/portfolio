/**
 * agenticPH Labs — Portfolio JS
 * Tab navigation, project filtering, case study expansion, theme toggle
 * No external dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ===========================================
     State
     =========================================== */
  const state = {
    activeTab: 'about',
    activeFilter: 'all',
    openCaseStudy: null,
  };

  const els = {
    navLinks: document.getElementById('nav-links'),
    navToggle: document.getElementById('mobile-nav-toggle'),
    themeToggle: document.getElementById('theme-toggle'),
    tabs: document.querySelectorAll('[data-tab]'),
    tabContents: document.querySelectorAll('.tab-content'),
    filterTabs: document.querySelectorAll('.filter-tab'),
    projectCards: document.querySelectorAll('.project-card'),
    heroCta: document.querySelector('.hero-cta'),
  };

  /* ===========================================
     Tab Navigation
     =========================================== */
  function switchTab(tabId) {
    // Update nav links
    els.navLinks.querySelectorAll('a').forEach((link) => {
      const isActive = link.dataset.tab === tabId;
      link.classList.toggle('active', isActive);
    });

    // Update tab contents
    els.tabContents.forEach((el) => {
      el.classList.toggle('active', el.id === tabId);
    });

    state.activeTab = tabId;
    window.history.replaceState(null, '', `#${tabId}`);

    // Close mobile nav on tab switch
    els.navLinks.classList.remove('open');
  }

  els.navLinks.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-tab]');
    if (!link) return;
    e.preventDefault();
    switchTab(link.dataset.tab);
  });

  /* ===========================================
     Mobile Nav Toggle
     =========================================== */
  els.navToggle.addEventListener('click', () => {
    els.navLinks.classList.toggle('open');
  });

  /* ===========================================
     Hero CTA -> Projects Tab
     =========================================== */
  els.heroCta.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('projects');
  });

  /* ===========================================
     Project Category Filtering
     =========================================== */
  els.filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      // Update active filter tab
      els.filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeFilter = filter;

      // Filter cards
      els.projectCards.forEach((card) => {
        const categories = card.dataset.categories || '';
        const matches = filter === 'all' || categories.split(',').includes(filter);

        // If filtering hides the open case study, close it
        if (!matches && card === state.openCaseStudy) {
          toggleCaseStudy(card);
        }

        card.classList.toggle('hidden', !matches);
      });
    });
  });

  /* ===========================================
     Case Study Toggle (click card to expand)
     =========================================== */
  function toggleCaseStudy(card) {
    const study = card.querySelector('.case-study');
    if (!study) return;

    const isOpen = study.classList.contains('open');

    // Close previously open case study if different card
    if (state.openCaseStudy && state.openCaseStudy !== card) {
      const oldStudy = state.openCaseStudy.querySelector('.case-study');
      if (oldStudy) {
        oldStudy.classList.remove('open');
      }
    }

    // Toggle this card
    study.classList.toggle('open');

    // Update state
    state.openCaseStudy = study.classList.contains('open') ? card : null;
  }

  els.projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't toggle if clicked on a link
      if (e.target.closest('a, button')) return;
      toggleCaseStudy(card);
    });
  });

  /* ===========================================
     Theme Toggle
     =========================================== */
  function getPreferredTheme() {
    const saved = localStorage.getItem('agenticph-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('agenticph-theme', theme);
  }

  // Init theme
  applyTheme(getPreferredTheme());

  els.themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ===========================================
     Init: Read URL hash for initial tab
     =========================================== */
  const hash = window.location.hash.replace('#', '');
  const validTabs = ['about', 'projects', 'services', 'contact'];
  if (validTabs.includes(hash)) {
    switchTab(hash);
  } else {
    switchTab('about');
  }

  /* ===========================================
     Handle direct URL hash changes (browser back/forward)
     =========================================== */
  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '');
    if (validTabs.includes(h)) {
      switchTab(h);
    }
  });
});
