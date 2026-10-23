# Requirements Document

## Introduction

Komala Portfolio is a premium, single-page interactive developer portfolio website built with pure HTML5, CSS3, and Vanilla JavaScript. It showcases the personal profile, education, skills, and projects of Komala P — a 3rd-year Computer Science and Engineering student. The site is designed with a futuristic aesthetic (deep navy background, electric blue and neon pink accents), is fully responsive, GitHub Pages compatible, and meets modern accessibility standards. All personal information is real; placeholders are used only where content does not yet exist (photo, resume, live URLs).

## Glossary

- **Portfolio_Site**: The complete single-page portfolio website delivered as static files.
- **Hero_Section**: The full-viewport introductory section containing name, photo placeholder, tagline, and call-to-action buttons.
- **Nav**: The sticky top navigation bar with links to all major sections.
- **Education_Card**: A clickable card in the Education section that opens a modal with additional details.
- **Skills_Section**: The section listing programming languages and technical interest areas, grouped by category, with no fake proficiency scores.
- **Projects_Section**: The section displaying project cards with filter controls and modal detail views.
- **Project_Card**: A card representing one project, showing title, category tag, and summary.
- **Filter_Control**: A button group that filters visible Project_Cards by category.
- **Modal**: An overlay dialog that displays full details for a selected Education_Card or Project_Card.
- **Achievements_Section**: The section for certifications and achievements, rendered with a clear empty-state message when no content exists.
- **Contact_Section**: The section containing editable placeholder links for email, GitHub, and LinkedIn.
- **Back_To_Top_Button**: A floating button that appears after the user scrolls down and returns the viewport to the top of the page.
- **Typing_Animator**: The JavaScript component that cycles through role/tagline strings in the Hero_Section using a typewriter effect.
- **Scroll_Reveal**: The mechanism that animates section content into view as the user scrolls.
- **Reduced_Motion_Mode**: The state active when the user's OS preference is `prefers-reduced-motion: reduce`.

---

## Requirements

### Requirement 1: Site Structure and File Organisation

**User Story:** As a developer maintaining the site, I want all source files organised in a predictable folder structure, so that I can locate and edit any file quickly.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL be delivered as a single `index.html` file, a `css/style.css` file, a `js/script.js` file, an `assets/images/` directory, an `assets/documents/` directory, and a `README.md` file, all inside a root folder named `Komala-Portfolio`.
2. THE Portfolio_Site SHALL require no build tools, no package managers, no server-side runtime, and no external frameworks to run.
3. THE Portfolio_Site SHALL be deployable to GitHub Pages by pushing the root folder contents to a repository's default branch without additional configuration.

---

### Requirement 2: Hero Section

**User Story:** As a visitor, I want to see an immediate, visually striking introduction, so that I understand who Komala P is and what actions I can take.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy the full viewport height on initial page load.
2. THE Hero_Section SHALL display the name "Komala P" as the primary heading.
3. THE Typing_Animator SHALL cycle through at least three role strings (e.g., "Computer Science Student", "Problem Solver", "Aspiring Software Developer") with a typewriter effect, displaying them beneath the primary heading.
4. THE Hero_Section SHALL display a circular photo placeholder with visible instructional text explaining how to replace it with a real photo.
5. THE Hero_Section SHALL contain four call-to-action buttons labelled "Explore Projects", "About Me", "Contact Me", and "Download Resume".
6. WHEN a visitor clicks "Explore Projects", THE Portfolio_Site SHALL scroll smoothly to the Projects_Section.
7. WHEN a visitor clicks "About Me", THE Portfolio_Site SHALL scroll smoothly to the About section.
8. WHEN a visitor clicks "Contact Me", THE Portfolio_Site SHALL scroll smoothly to the Contact_Section.
9. WHEN a visitor clicks "Download Resume", THE Portfolio_Site SHALL open or download the file at `assets/documents/resume.pdf`; if the file is absent, THE Portfolio_Site SHALL display a placeholder instruction rather than a broken link.

---

### Requirement 3: Sticky Navigation

**User Story:** As a visitor, I want a persistent navigation bar, so that I can jump to any section from anywhere on the page without scrolling back to the top.

#### Acceptance Criteria

1. THE Nav SHALL remain fixed to the top of the viewport as the user scrolls.
2. THE Nav SHALL contain links labelled "Home", "About", "Education", "Skills", "Projects", "Achievements", and "Contact".
3. WHEN a visitor clicks a Nav link, THE Portfolio_Site SHALL scroll smoothly to the corresponding section.
4. WHEN the user scrolls past a section, THE Nav SHALL highlight the link corresponding to the currently visible section using an active style distinct from inactive links.
5. WHEN the viewport width is below 768 px, THE Nav SHALL collapse its links behind a hamburger toggle button.
6. WHEN the hamburger toggle is activated, THE Nav SHALL expand to display all navigation links in a vertical list.

---

### Requirement 4: About Me Section

**User Story:** As a visitor, I want to read a concise personal bio, so that I can understand Komala P's background, interests, and goals.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render an About section with a short bio paragraph describing Komala P as a 3rd-year CSE student with interests in DSA, problem solving, algorithm design, web development, software development, and hardware/embedded systems.
2. THE Portfolio_Site SHALL list the languages spoken (English, Kannada, Hindi) within the About section.
3. THE Portfolio_Site SHALL NOT fabricate any internship experience, award, or professional achievement in the About section.

---

### Requirement 5: Education Section

**User Story:** As a visitor, I want to browse Komala P's educational background, so that I can verify academic qualifications at a glance and get more detail on demand.

#### Acceptance Criteria

1. THE Education_Card for BE in Computer Science and Engineering SHALL display the institution name, degree name, current year (3rd year, 5th semester), and CGPA of 8.29.
2. THE Education_Card for 11th–12th standard SHALL display Vidyaniketan PU College, Tumkur, and percentage of 91%.
3. THE Education_Card for 10th standard SHALL display Kendriya Vidyalaya (KV), Tumkur, and percentage of 88%.
4. WHEN a visitor clicks an Education_Card, THE Modal SHALL open and display the full details for that education entry.
5. WHEN a Modal is open, THE Portfolio_Site SHALL trap keyboard focus within the Modal.
6. WHEN a visitor presses the Escape key while a Modal is open, THE Modal SHALL close and return focus to the Education_Card that triggered it.
7. WHEN a visitor clicks the close button inside a Modal, THE Modal SHALL close and return focus to the triggering Education_Card.

---

### Requirement 6: Skills Section

**User Story:** As a visitor, I want to see Komala P's technical skills organised by category, so that I can assess relevant competencies without misleading proficiency scores.

#### Acceptance Criteria

1. THE Skills_Section SHALL group skills into named categories, including at minimum: "Programming Languages" (C, C++, Java, Python) and "Technical Interests & Areas" (DSA, Problem Solving, Algorithm Design, Web Development, Software Development, Hardware & Embedded Systems).
2. THE Skills_Section SHALL NOT display any numerical proficiency percentage, star rating, or progress bar implying a measured skill level.
3. THE Skills_Section SHALL render each skill as a labelled tag or badge.

---

### Requirement 7: Projects Section

**User Story:** As a visitor, I want to browse and filter Komala P's projects by category, so that I can quickly find projects relevant to my interests and see full details on demand.

#### Acceptance Criteria

1. THE Projects_Section SHALL display a Project_Card for each of the following projects: "Guardian Circle" (category: Web), "Arduino Obstacle-Avoidance Rover" (category: Hardware), "CivicPulse" (category: Concepts), and "FocusBank" (category: Concepts).
2. THE Filter_Control SHALL contain buttons labelled "All", "Software", "Web", "Hardware", and "Concepts".
3. WHEN a visitor clicks a Filter_Control button, THE Projects_Section SHALL show only Project_Cards matching the selected category and hide all others.
4. WHEN "All" is selected in the Filter_Control, THE Projects_Section SHALL display all Project_Cards.
5. WHEN a visitor clicks a Project_Card, THE Modal SHALL open and display the project title, category, full description, technologies used, and status.
6. THE Project_Card for "Guardian Circle" SHALL clearly label the project as a "Concept / Design Project" and SHALL NOT display a fake live URL.
7. THE Project_Card for "CivicPulse" and "FocusBank" SHALL clearly label both projects as "Future Concept" and SHALL NOT display fake live URLs or fake repository links.
8. WHEN a Modal is open, THE Portfolio_Site SHALL trap keyboard focus within the Modal.
9. WHEN a visitor presses the Escape key while a Modal is open, THE Modal SHALL close and return focus to the Project_Card that triggered it.

---

### Requirement 8: Achievements and Certifications Section

**User Story:** As a visitor, I want to see any certifications or achievements, so that I can assess additional accomplishments beyond formal education.

#### Acceptance Criteria

1. THE Achievements_Section SHALL render with a visible empty-state message (e.g., "Certifications and achievements will be listed here as they are earned.") when no achievement entries exist.
2. THE Portfolio_Site SHALL NOT fabricate any certification, award, or achievement entry.
3. WHEN achievement entries are added in the future, THE Achievements_Section SHALL display each entry with a title, issuing organisation, and date.

---

### Requirement 9: Contact Section

**User Story:** As a visitor, I want to find Komala P's contact details, so that I can reach out for collaboration or opportunities.

#### Acceptance Criteria

1. THE Contact_Section SHALL display a placeholder email address with a visible instruction to replace it with a real address.
2. THE Contact_Section SHALL display a placeholder GitHub profile URL with a visible instruction to replace it with the real profile link.
3. THE Contact_Section SHALL display a placeholder LinkedIn profile URL with a visible instruction to replace it with the real profile link.
4. THE Portfolio_Site SHALL NOT display any fabricated contact URLs or email addresses as if they were real.
5. WHEN a visitor clicks a contact link that has been populated with a real URL, THE Portfolio_Site SHALL open the link in a new browser tab.

---

### Requirement 10: Footer

**User Story:** As a visitor at the bottom of the page, I want quick navigation links and copyright information, so that I can move to another section without scrolling back to the top.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render a footer containing navigation shortcut links mirroring the Nav labels.
2. THE Portfolio_Site SHALL render a copyright notice in the footer reading "© 2025 Komala P. All rights reserved." or equivalent.
3. WHEN a visitor clicks a footer navigation link, THE Portfolio_Site SHALL scroll smoothly to the corresponding section.

---

### Requirement 11: Back-to-Top Button

**User Story:** As a visitor who has scrolled deep into the page, I want a back-to-top button, so that I can return to the top quickly without manually scrolling.

#### Acceptance Criteria

1. WHEN the user has scrolled more than 300 px from the top of the page, THE Back_To_Top_Button SHALL become visible.
2. WHEN the user has scrolled fewer than 300 px from the top of the page, THE Back_To_Top_Button SHALL be hidden.
3. WHEN a visitor clicks the Back_To_Top_Button, THE Portfolio_Site SHALL scroll smoothly to the top of the page.

---

### Requirement 12: Scroll Reveal Animations

**User Story:** As a visitor, I want content to animate into view as I scroll, so that the page feels dynamic and engaging.

#### Acceptance Criteria

1. WHEN a section enters the viewport during scrolling, THE Scroll_Reveal SHALL animate the section's content from an offset position to its final position with a fade-in transition.
2. WHILE Reduced_Motion_Mode is active, THE Scroll_Reveal SHALL skip all motion-based transitions and display content immediately without animation.

---

### Requirement 13: Typing Animation

**User Story:** As a visitor viewing the Hero_Section, I want to see an animated typewriter effect, so that the page feels alive and highlights Komala P's multiple roles.

#### Acceptance Criteria

1. THE Typing_Animator SHALL display each role string one character at a time at a consistent typing speed.
2. WHEN a role string is fully displayed, THE Typing_Animator SHALL pause for at least 1500 ms before erasing it.
3. WHEN a role string is fully erased, THE Typing_Animator SHALL begin typing the next role string in the sequence.
4. THE Typing_Animator SHALL loop through all role strings continuously.
5. WHILE Reduced_Motion_Mode is active, THE Typing_Animator SHALL display the first role string as static text without character-by-character animation.

---

### Requirement 14: Responsive Layout

**User Story:** As a visitor on any device, I want the portfolio to display correctly, so that I can browse comfortably on mobile, tablet, or desktop.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use a fluid layout that adapts to viewport widths from 320 px to 2560 px without horizontal scrolling or content overflow.
2. WHEN the viewport width is below 768 px, THE Portfolio_Site SHALL stack multi-column layouts into single-column layouts.
3. WHEN the viewport width is between 768 px and 1024 px, THE Portfolio_Site SHALL use two-column layouts where appropriate.
4. THE Portfolio_Site SHALL use CSS media queries to implement all responsive breakpoints without JavaScript layout calculation.

---

### Requirement 15: Accessibility

**User Story:** As a visitor using a keyboard or assistive technology, I want full access to all interactive elements, so that the site is usable regardless of my input method or ability.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) to convey document structure.
2. THE Portfolio_Site SHALL provide descriptive `alt` attributes for all `<img>` elements.
3. THE Portfolio_Site SHALL ensure all interactive elements (buttons, links, form controls) are reachable and operable via keyboard Tab and Enter/Space keys.
4. THE Portfolio_Site SHALL maintain a visible focus indicator on all interactive elements that meets WCAG 2.1 AA contrast requirements.
5. THE Portfolio_Site SHALL assign appropriate ARIA roles and labels to Modal elements (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
6. THE Portfolio_Site SHALL assign `aria-label` or `aria-labelledby` to the Nav element.
7. IF a color contrast ratio between foreground text and background falls below 4.5:1 for normal text or 3:1 for large text, THEN THE Portfolio_Site SHALL use an alternative color combination that meets or exceeds those ratios.

---

### Requirement 16: Visual Design System

**User Story:** As a visitor, I want a consistent, premium visual appearance throughout the site, so that the portfolio feels professional and memorable.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use a deep navy or near-black color (approximately `#0a0e1a`) as the primary background.
2. THE Portfolio_Site SHALL use electric blue (approximately `#00d4ff`) and neon pink (approximately `#ff006e`) as accent colors.
3. THE Portfolio_Site SHALL apply purple-to-blue CSS gradients to section headers and decorative elements.
4. THE Portfolio_Site SHALL style cards with a semi-transparent glass-morphism background, a subtle glowing border, and a backdrop-filter blur effect.
5. THE Portfolio_Site SHALL apply smooth CSS transitions (200 ms–400 ms) to hover and focus state changes on interactive elements.
6. WHILE Reduced_Motion_Mode is active, THE Portfolio_Site SHALL disable or minimise all CSS transition and animation durations.
