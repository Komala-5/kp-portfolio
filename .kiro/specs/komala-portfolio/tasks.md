# Implementation Plan: Komala Portfolio

## Overview

Build the portfolio as three files — `index.html`, `css/style.css`, `js/script.js` — inside `Komala-Portfolio/`. Each task builds on the previous one, wiring components together incrementally. No build tools required; the site runs by opening `index.html` in a browser or pushing to GitHub Pages.

Testing uses **fast-check** (property-based) and **jsdom** (unit) run via Node.js directly (no test runner config needed beyond `npm install fast-check jsdom`).

## Tasks

- [x] 1. Scaffold project structure and HTML skeleton
  - Create `Komala-Portfolio/` with subdirectories `css/`, `js/`, `assets/images/`, `assets/documents/`
  - Write `index.html` with all semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>` for each of Hero, About, Education, Skills, Projects, Achievements, Contact, and `<footer>`
  - Add `<link rel="stylesheet" href="css/style.css">` and `<script defer src="js/script.js">` in `<head>`
  - Create empty `css/style.css` and `js/script.js` placeholder files
  - Create `README.md` with placeholder replacement instructions
  - _Requirements: 1.1, 1.2, 1.3, 15.1_

- [ ] 2. Implement CSS design tokens and base styles
  - [x] 2.1 Define `:root` CSS custom properties
    - Add all color tokens (`--bg-primary`, `--bg-secondary`, `--accent-blue`, `--accent-pink`, `--text-primary`, `--text-secondary`), gradient tokens, glass tokens, timing tokens, layout tokens exactly as specified in the design
    - Apply `--bg-primary` to `body` background; set `--text-primary` as base text color; set `box-sizing: border-box` globally
    - _Requirements: 16.1, 16.2, 16.3_

  - [x] 2.2 Add responsive breakpoints and layout utilities
    - Write media queries for `< 768 px` (single-column, hamburger), `768 px – 1024 px` (two-column), `> 1024 px` (multi-column)
    - Add `@media (prefers-reduced-motion: reduce)` block that sets `transition-duration` and `animation-duration` to `0.01ms`
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 16.6_

  - [x] 2.3 Style glass-morphism cards and interactive element transitions
    - Apply `--glass-bg`, `--glass-border`, `--glass-blur` to `.education-card`, `.project-card`, `.achievement-card`
    - Add `transition: var(--transition-base)` to all hover/focus state changes on buttons and links; add visible `:focus-visible` ring meeting WCAG 4.5:1
    - _Requirements: 16.4, 16.5, 15.4_

- [ ] 3. Build sticky navigation and hamburger menu
  - [x] 3.1 Implement Nav HTML and CSS
    - Add `.logo`, `<ul class="nav-links">` with seven `<a>` items (Home, About, Education, Skills, Projects, Achievements, Contact), and `<button class="hamburger" aria-expanded="false" aria-label="Toggle navigation">`
    - Style `<header>` as `position: fixed; top: 0; width: 100%`; apply glass background; add `aria-label="Main navigation"` to `<nav>`
    - _Requirements: 3.1, 3.2, 15.6_

  - [x] 3.2 Implement hamburger toggle in `script.js`
    - Write `initHamburger()`: toggle `.nav-open` class on `<nav>`, update `aria-expanded` on button, close menu when a nav link is clicked
    - _Requirements: 3.5, 3.6_

  - [x] 3.3 Implement active nav link tracking with IntersectionObserver
    - Write `initNavTracker()`: observe each `<section>`, call `setActiveLink(sectionId)` for the most-intersecting section, add/remove `.active` class on matching `<a>` elements
    - _Requirements: 3.4_

  - [ ]* 3.4 Write property test for active nav link tracking (Property 4)
    - **Property 4: Active nav link tracks the visible section**
    - **Validates: Requirements 3.4**
    - Use `fc.constantFrom('hero','about','education','skills','projects','achievements','contact')` to generate intersection states; assert exactly one `.active` link at all times

- [ ] 4. Build Hero section
  - [x] 4.1 Implement Hero HTML content
    - Add `<section id="hero">` with `<img class="hero-photo" alt="Photo of Komala P — placeholder image">`, `<h1>Komala P</h1>`, `<span id="typed-role">`, and four CTA `<a>` buttons (Explore Projects, About Me, Contact Me, Download Resume)
    - Set resume link `href="assets/documents/resume.pdf"` with `download` attribute and `aria-label="Download Resume — file not yet available, replace assets/documents/resume.pdf"`; include "(placeholder)" in visible text
    - Style hero at `min-height: 100vh`; add CSS fallback `::after` pseudo-element on `.hero-photo` for broken-image placeholder circle
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 15.2_

  - [x] 4.2 Implement `TypingAnimator` in `script.js`
    - Write `TypingAnimator` with `init(elementId, strings, typingSpeed, pauseDuration)` and `stop()` methods using `setTimeout` chains
    - Add `prefers-reduced-motion` check at the top of `init`: if active, set `element.textContent = strings[0]` and return immediately
    - Call `TypingAnimator.init('typed-role', [...], 80, 1800)` at page load
    - _Requirements: 2.3, 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ]* 4.3 Write property test for Typing Animator loop cycling (Property 5)
    - **Property 5: Typing animator loops through all strings**
    - **Validates: Requirements 13.4, 2.3**
    - Use `fc.array(fc.string({minLength:1}), {minLength:1, maxLength:10})`; run one full cycle; assert `nextIndex === 0`

  - [ ]* 4.4 Write property test for Typing Animator timing invariants (Property 6)
    - **Property 6: Typing animator respects timing invariants**
    - **Validates: Requirements 13.1, 13.2**
    - Use `fc.integer({min:50,max:200})` for T and `fc.integer({min:1500,max:3000})` for P; assert character delay ≈ T and pause ≥ P

- [ ] 5. Implement Scroll Reveal
  - [x] 5.1 Add `reveal` classes to section content and implement observer
    - Add `class="reveal"` to section headings, cards, and content blocks throughout `index.html`
    - Write `initScrollReveal()` in `script.js`: create `IntersectionObserver`, on entry add `class="visible"` and `unobserve`; if `prefers-reduced-motion` active, add `visible` synchronously to all `.reveal` elements during init without scheduling transitions
    - Add CSS: `.reveal { opacity: 0; transform: translateY(20px); transition: opacity var(--transition-slow), transform var(--transition-slow); }` and `.reveal.visible { opacity: 1; transform: none; }`
    - _Requirements: 12.1, 12.2_

  - [ ]* 5.2 Write property test for scroll reveal visible class (Property 1)
    - **Property 1: Scroll reveal adds visible class on viewport entry**
    - **Validates: Requirements 12.1**
    - Use `fc.array(fc.record({id: fc.string()}), {minLength:1})`; fire IntersectionObserver callback; assert all have `visible` class and it is never removed

  - [ ]* 5.3 Write property test for reduced-motion scroll reveal (Property 2)
    - **Property 2: Reduced-motion disables scroll reveal transitions**
    - **Validates: Requirements 12.2, 16.6**
    - Same setup with `matchMedia` mocked to `reduce`; assert `visible` is set synchronously during init with no deferred scheduling

- [ ] 6. Build About, Skills, and Footer sections
  - [x] 6.1 Implement About section HTML
    - Add `<section id="about">` with bio paragraph (3rd-year CSE student, interests in DSA, problem solving, algorithm design, web development, software development, hardware/embedded systems) and spoken languages list (English, Kannada, Hindi)
    - Do NOT include any fabricated internship, award, or professional achievement
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 6.2 Implement Skills section HTML
    - Add `<section id="skills">` with two named groups: "Programming Languages" (C, C++, Java, Python) and "Technical Interests & Areas" (DSA, Problem Solving, Algorithm Design, Web Development, Software Development, Hardware & Embedded Systems)
    - Render each skill as a `<span class="skill-tag">` badge; include NO `<progress>`, percentage text, or star elements anywhere in the section
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 6.3 Implement Footer HTML and CSS
    - Add `<footer>` with nav shortcut links mirroring the seven Nav labels and copyright text "© 2025 Komala P. All rights reserved."
    - Smooth-scroll links use same `href="#section-id"` pattern as Nav
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 7. Checkpoint — ensure structure, styles, and basic JS are working
  - Verify `index.html` opens in browser without console errors; nav links scroll correctly; hamburger toggles on mobile viewport; scroll reveal fires; typing animator runs
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Build Education section and modal system
  - [x] 8.1 Implement Education section HTML with data attributes
    - Add `<section id="education">` with three `<article class="education-card">` elements
    - Card 1: BE CSE — institution, "3rd Year, 5th Semester", CGPA 8.29; Card 2: Vidyaniketan PU College Tumkur, 91%; Card 3: Kendriya Vidyalaya Tumkur, 88%
    - Encode each card's full details as `data-modal='{"title":...}'` JSON attribute
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 8.2 Implement shared Modal `<dialog>` element
    - Add single `<dialog id="detail-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">` at end of `<body>` with `.modal-header` (containing `<h2 id="modal-title">` and `<button class="modal-close" aria-label="Close">`), and `.modal-body`
    - Style backdrop with `::backdrop`; apply glass-morphism to dialog element
    - _Requirements: 5.4, 7.5, 15.5_

  - [x] 8.3 Implement modal open/close logic in `script.js`
    - Write `ModalController` with `open(card)` and `close()` methods
    - `open`: parse `data-modal` JSON (catch parse error → show "Details unavailable" message), populate `#modal-title` and `.modal-body`, store `previousFocus = document.activeElement`, call `dialog.showModal()`, attach keydown listener
    - `close`: call `dialog.close()`, restore `previousFocus.focus()`, remove keydown listener
    - Handle invalid/missing JSON gracefully per the error-handling spec
    - _Requirements: 5.4, 5.6, 5.7, 7.5, 7.9_

  - [ ] 8.4 Implement keyboard focus trap in `script.js`
    - In the keydown listener attached by `ModalController.open`: query all focusable children (`a, button, [tabindex]:not([tabindex="-1"])`); on Tab cycle forward wrapping from last to first; on Shift+Tab cycle backward wrapping from first to last; on Escape call `ModalController.close()`
    - _Requirements: 5.5, 7.8, 15.3_

  - [ ]* 8.5 Write property test for modal focus trap (Property 8)
    - **Property 8: Modal traps keyboard focus within its boundary**
    - **Validates: Requirements 5.5, 7.8**
    - Use `fc.integer({min:2, max:10})` focusable elements; simulate Tab/Shift+Tab sequences; assert `document.activeElement` is always inside modal

  - [ ]* 8.6 Write property test for modal focus restore (Property 9)
    - **Property 9: Modal close restores focus to the triggering element**
    - **Validates: Requirements 5.6, 5.7, 7.9**
    - Use `fc.boolean()` (Escape vs close-button) and random card sets; assert `document.activeElement === triggeringCard` after close

- [ ] 9. Build Projects section with filter
  - [x] 9.1 Implement Projects section HTML with data attributes
    - Add `<section id="projects">` with filter bar (`<div class="filter-bar">` containing buttons: "All", "Software", "Web", "Hardware", "Concepts") and card grid
    - Add four `<article class="project-card" data-category="...">` cards: Guardian Circle (Web, concept label, `hasLiveUrl:false`), Arduino Obstacle-Avoidance Rover (Hardware), CivicPulse (Concepts, future concept label, `hasLiveUrl:false`, `hasRepoUrl:false`), FocusBank (Concepts, future concept label, `hasLiveUrl:false`, `hasRepoUrl:false`)
    - Encode full details in `data-modal` JSON on each card; include `status` field matching the design spec
    - _Requirements: 7.1, 7.2, 7.5, 7.6, 7.7_

  - [x] 9.2 Implement `FilterController` in `script.js`
    - Write `FilterController.init(filterBarId, cardContainerId)`: on filter button click, set `data-active` on clicked button, iterate cards and toggle `aria-hidden="true"` + CSS `display: none` on non-matching cards; "All" button shows all cards
    - If zero cards match, inject `<p aria-live="polite">No projects in this category yet.</p>` into container
    - _Requirements: 7.3, 7.4_

  - [ ]* 9.3 Write property test for category filter (Property 3)
    - **Property 3: Category filter shows only matching cards**
    - **Validates: Requirements 7.3**
    - Use `fc.constantFrom('Web','Hardware','Concepts','Software')` and `fc.array(fc.record({category: fc.constantFrom(...)}), {minLength:1})`; assert no visible card has a mismatched category

- [ ] 10. Build Achievements and Contact sections
  - [x] 10.1 Implement Achievements section HTML
    - Add `<section id="achievements">` with empty-state `<p>Certifications and achievements will be listed here as they are earned.</p>` as the sole content
    - Do NOT add any fabricated entries
    - _Requirements: 8.1, 8.2_

  - [x] 10.2 Implement Contact section HTML
    - Add `<section id="contact">` with three placeholder links: email (`mailto:placeholder@example.com` with visible "replace with your email" instruction), GitHub (`https://github.com/your-username` placeholder), LinkedIn (`https://linkedin.com/in/your-username` placeholder)
    - Set all external links to `target="_blank" rel="noopener noreferrer"`
    - Do NOT use fabricated real URLs
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 11. Implement Back-to-Top button
  - [x] 11.1 Add Back-to-Top button HTML and CSS
    - Add `<button id="back-to-top" aria-label="Back to top">` near end of `<body>`; style as fixed floating button, initially hidden; show when class `visible` is present
    - _Requirements: 11.1, 11.2_

  - [x] 11.2 Implement Back-to-Top visibility logic and scroll handler in `script.js`
    - Write `initBackToTop()`: throttle scroll handler with `requestAnimationFrame`; toggle class `visible` when `window.scrollY > 300`; click handler calls `window.scrollTo({ top: 0, behavior: 'smooth' })`
    - _Requirements: 11.1, 11.2, 11.3_

  - [ ]* 11.3 Write property test for Back-to-Top visibility threshold (Property 7)
    - **Property 7: Back-to-top button visibility follows the 300 px threshold**
    - **Validates: Requirements 11.1, 11.2**
    - Use `fc.integer({min:0, max:5000})`; assert `button.classList.contains('visible') === (scrollY > 300)` for all generated values

- [ ] 12. Accessibility and keyboard-reach audit
  - [x] 12.1 Verify and fix all ARIA attributes and semantic structure
    - Confirm `<nav aria-label="Main navigation">`, all modal ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), `aria-expanded` on hamburger, `aria-label` on back-to-top and close buttons
    - Confirm all `<img>` elements have non-empty descriptive `alt` text
    - _Requirements: 15.1, 15.2, 15.5, 15.6_

  - [ ]* 12.2 Write property test for keyboard reachability of all interactive elements (Property 10)
    - **Property 10: All interactive elements are keyboard reachable**
    - **Validates: Requirements 15.3**
    - DOM introspection via jsdom: query all `a, button, input, select, textarea` in document; assert every element has `tabIndex >= 0` and is not `display:none` or `visibility:hidden` without a valid `aria-hidden="true"`

- [ ] 13. Write unit tests for content accuracy and integration points
  - [ ]* 13.1 Write unit tests for HTML content and structure
    - Hero `<h1>` contains "Komala P" (Req 2.2); hero photo `<img>` has non-empty `alt` (Req 15.2); resume link `href` is `assets/documents/resume.pdf` (Req 2.9); nav contains exactly 7 links with correct labels (Req 3.2)
    - Education cards display correct institution, year, score data for all three entries (Req 5.1–5.3); Skills section contains no `<progress>`, no `%` text, no star elements (Req 6.2)
    - Footer copyright text matches "© 2025 Komala P" (Req 10.2); Achievements section shows empty-state paragraph (Req 8.1)

  - [ ]* 13.2 Write unit tests for JS component behaviour
    - Modal `<dialog>` has `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (Req 15.5); Contact section contains no non-placeholder real URLs (Req 9.4)
    - Project cards for Guardian Circle, CivicPulse, FocusBank have concept/future concept labels and `hasLiveUrl: false` (Req 7.6, 7.7)
    - Reduced motion: typing animator sets static text and returns (Req 13.5); "All" filter makes all project cards visible (Req 7.4); back-to-top click calls `window.scrollTo` with `{ top: 0 }` (Req 11.3)

- [x] 14. Final checkpoint — all tests pass and site is GitHub Pages ready
  - Run all unit tests and property-based tests; fix any failures
  - Verify `index.html` is at the repo root level (or `Komala-Portfolio/` configured as Pages source); confirm no broken asset paths
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All property tests must run ≥ 100 iterations and carry the comment tag `// Feature: komala-portfolio, Property N: <property text>`
- Test setup: `npm install fast-check jsdom` in the project root; tests run with `node tests/` (no bundler needed)
- Property tests live in `tests/properties/`, unit tests in `tests/unit/`
- Checkpoints in tasks 7 and 14 are good moments to preview the site in a browser before continuing
