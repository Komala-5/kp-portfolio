/**
 * Komala Portfolio — script.js
 *
 * Modules:
 *  - HamburgerMenu    — toggles mobile nav, closes on outside click
 *  - NavActiveTracker — highlights active nav link via IntersectionObserver
 *  - TypingAnimator   — cycles role strings in #typed-role (respects reduced-motion)
 *  - ScrollReveal     — fade-in on scroll via IntersectionObserver (one-time)
 *  - ModalController  — opens/closes <dialog> for education & project cards
 *                       includes keyboard focus trap and Escape-to-close
 *  - FilterController — filters project cards by category, shows empty state
 *  - BackToTop        — shows/hides button at 300px scroll, smooth-scrolls to top
 */

// ── HamburgerMenu ────────────────────────────────────────────
function initHamburger() {
  const btn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  if (!btn || !navLinks) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('nav-open', !isOpen);
  });

  // Close menu when any nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('nav-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !navLinks.contains(e.target)) {
      btn.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('nav-open');
    }
  });
}

// ── NavActiveTracker ─────────────────────────────────────────
function initNavTracker() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  // Map section id → nav link element
  const linkMap = {};
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap[href.slice(1)] = link;
    }
  });

  function setActiveLink(id) {
    navLinks.forEach(l => l.classList.remove('active'));
    if (linkMap[id]) linkMap[id].classList.add('active');
  }

  // Track which section is most visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

// ── TypingAnimator ───────────────────────────────────────────
const TypingAnimator = (() => {
  let timeoutId = null;

  function init(elementId, strings, typingSpeed = 80, pauseDuration = 1800) {
    const el = document.getElementById(elementId);
    if (!el || !strings || !strings.length) return;

    // Respect prefers-reduced-motion: show first string as static text
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = strings[0];
      return;
    }

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
      const currentString = strings[stringIndex];

      if (!isDeleting) {
        // Typing forward
        charIndex++;
        el.textContent = currentString.slice(0, charIndex);
        el.setAttribute('aria-label', currentString);

        if (charIndex === currentString.length) {
          // Finished typing — pause, then start deleting
          isDeleting = true;
          timeoutId = setTimeout(tick, pauseDuration);
          return;
        }
      } else {
        // Deleting
        charIndex--;
        el.textContent = currentString.slice(0, charIndex);

        if (charIndex === 0) {
          // Finished deleting — move to next string
          isDeleting = false;
          stringIndex = (stringIndex + 1) % strings.length;
          timeoutId = setTimeout(tick, typingSpeed * 2);
          return;
        }
      }

      timeoutId = setTimeout(tick, isDeleting ? typingSpeed / 2 : typingSpeed);
    }

    el.textContent = '';
    tick();
  }

  function stop() {
    if (timeoutId) clearTimeout(timeoutId);
  }

  return { init, stop };
})();

// ── ScrollReveal ─────────────────────────────────────────────
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  // Respect prefers-reduced-motion: make all visible immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // one-time reveal
        }
      });
    },
    { threshold: 0.1, rootMargin: '-40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

// ── ModalController ──────────────────────────────────────────
const ModalController = (() => {
  let previousFocus = null;
  let keydownHandler = null;

  function getDialog() { return document.getElementById('detail-modal'); }

  function getFocusableChildren() {
    const dialog = getDialog();
    if (!dialog) return [];
    return Array.from(
      dialog.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function open(card) {
    const dialog = getDialog();
    if (!dialog) return;

    let data = {};
    try {
      data = JSON.parse(card.dataset.modal);
    } catch (e) {
      data = { title: 'Details unavailable', details: 'Please check the data-modal attribute on this card.' };
    }

    document.getElementById('modal-title').textContent = data.title || 'Details';

    const body = document.getElementById('modal-body');
    let html = '';
    if (data.institution) html += `<p><strong>Institution:</strong> ${data.institution}</p>`;
    if (data.year)        html += `<p style="margin-top:0.5rem"><strong>Year / Level:</strong> ${data.year}</p>`;
    if (data.score)       html += `<p style="margin-top:0.5rem"><strong>Score:</strong> ${data.score}</p>`;
    if (data.category)    html += `<p style="margin-top:0.5rem"><strong>Category:</strong> ${data.category}</p>`;
    if (data.status)      html += `<p style="margin-top:0.5rem"><strong>Status:</strong> ${data.status}</p>`;
    if (data.details)     html += `<p style="margin-top:1rem">${data.details}</p>`;
    if (data.features)    html += `<p style="margin-top:1rem"><strong>Key Features:</strong></p><p style="margin-top:0.25rem">${data.features}</p>`;
    if (data.technologies && data.technologies.length) {
      html += `<p style="margin-top:1rem"><strong>Technologies:</strong></p>`;
      html += `<div class="modal-tech-list">${data.technologies.map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>`;
    }
    body.innerHTML = html;

    previousFocus = document.activeElement;
    dialog.showModal();

    keydownHandler = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') {
        const focusable = getFocusableChildren();
        if (!focusable.length) { e.preventDefault(); return; }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    dialog.addEventListener('keydown', keydownHandler);
  }

  function close() {
    const dialog = getDialog();
    if (!dialog) return;
    if (keydownHandler) dialog.removeEventListener('keydown', keydownHandler);
    dialog.close();
    if (previousFocus) previousFocus.focus();
  }

  function init() {
    const dialog = getDialog();
    if (!dialog) return;

    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', close);

    dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });

    document.querySelectorAll('.education-card, .project-card').forEach(card => {
      card.addEventListener('click', () => open(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
      });
    });
  }

  return { init, open, close };
})();

// ── FilterController ─────────────────────────────────────────
const FilterController = (() => {
  function init(filterBarId, gridId) {
    const bar = document.getElementById(filterBarId);
    const grid = document.getElementById(gridId);
    if (!bar || !grid) return;

    bar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button state
        bar.querySelectorAll('.filter-btn').forEach(b => {
          b.removeAttribute('data-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.setAttribute('data-active', '');
        btn.setAttribute('aria-pressed', 'true');

        const filter = btn.dataset.filter;
        const cards = grid.querySelectorAll('.project-card');

        // Remove previous empty state if any
        const prev = grid.querySelector('.projects-empty-state');
        if (prev) prev.remove();

        let visibleCount = 0;
        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.hidden = !match;
          card.setAttribute('aria-hidden', String(!match));
          if (match) visibleCount++;
        });

        // Show empty state if no cards match
        if (visibleCount === 0) {
          const msg = document.createElement('p');
          msg.className = 'projects-empty-state';
          msg.setAttribute('aria-live', 'polite');
          msg.textContent = 'No projects in this category yet.';
          grid.appendChild(msg);
        }
      });
    });
  }

  return { init };
})();

// ── BackToTop ────────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let rafPending = false;

  window.addEventListener('scroll', () => {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        btn.classList.toggle('visible', window.scrollY > 300);
        rafPending = false;
      });
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initNavTracker();
  initScrollReveal();
  ModalController.init();
  FilterController.init('project-filter-bar', 'projects-grid');
  initBackToTop();
  TypingAnimator.init('typed-role', [
    'Computer Science Student',
    'Problem Solver',
    'Aspiring Software Developer',
    'DSA Enthusiast',
    'Hardware Explorer'
  ], 80, 1800);
});
