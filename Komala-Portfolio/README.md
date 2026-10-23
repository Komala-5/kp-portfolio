# Komala P — Portfolio

A single-page personal portfolio website built with pure HTML5, CSS3, and Vanilla JavaScript.
No build tools, no frameworks, no dependencies — just open `index.html` in a browser.

---

## Project Overview

This portfolio showcases the academic background, technical skills, and projects of Komala P,
a 3rd-year Computer Science and Engineering student. It features a futuristic glass-morphism
aesthetic, smooth scroll animations, a typing animator, project filtering, and responsive
layouts for all screen sizes.

---

## Folder Structure

```
Komala-Portfolio/
├── index.html               # Single-page HTML document
├── css/
│   └── style.css            # All styles and design tokens
├── js/
│   └── script.js            # All interactive behaviour
├── assets/
│   ├── images/              # Profile photo and project screenshots
│   │   └── .gitkeep
│   └── documents/
│       └── resume.pdf       # Resume PDF (add your file here)
│       └── .gitkeep
└── README.md                # This file
```

---

## How to Preview Locally

**Option 1 — Open directly in a browser:**
1. Navigate to the `Komala-Portfolio/` folder.
2. Double-click `index.html` to open it in your default browser.

**Option 2 — Use VS Code Live Server (recommended for auto-reload):**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.
2. Open the `Komala-Portfolio/` folder in VS Code.
3. Right-click `index.html` → **"Open with Live Server"**.

---

## How to Replace the Profile Photo

1. Choose a square photo (e.g., `profile.jpg`) and copy it into `assets/images/`.
2. Open `index.html` and find the `<img>` tag inside `#hero`:
   ```html
   <img src="assets/images/profile.jpg" alt="Photo of Komala P — placeholder image" ...>
   ```
3. Update the `src` attribute to match your filename if different.
4. Update the `alt` attribute with a concise description of the photo.

---

## How to Add the Resume PDF

1. Export your resume as a PDF named `resume.pdf`.
2. Copy `resume.pdf` into `assets/documents/`.
3. The "Download Resume" button in the Hero section already points to
   `assets/documents/resume.pdf` — no code changes needed.

---

## How to Edit Personal Details

All personal content is stored directly in `index.html`. To update any detail:

1. Open `index.html` in a text editor or VS Code.
2. Search (`Ctrl+F` / `Cmd+F`) for the text you want to change.
3. Replace it with your real information and save.

Key placeholders to replace:
- **Name heading** — `<h1>Komala P</h1>` in `#hero`
- **Email** — the placeholder address in `#contact`
- **GitHub URL** — the placeholder link in `#contact`
- **LinkedIn URL** — the placeholder link in `#contact`
- **Education details** — `data-modal` attributes on each `.education-card`
- **Project descriptions** — `data-modal` attributes on each `.project-card`

---

## How to Publish to GitHub Pages

1. **Create a GitHub repository** (e.g., `komala-portfolio`) at <https://github.com/new>.
   Make it public.

2. **Initialise git locally** (if not already done):
   ```bash
   cd Komala-Portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```

3. **Add the remote and push:**
   ```bash
   git remote add origin https://github.com/<your-username>/komala-portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to your repository → **Settings** → **Pages**.
   - Under "Branch", select `main` and folder `/` (root).
   - Click **Save**.

5. **Access your site** at `https://<your-username>.github.io/komala-portfolio/`
   (GitHub may take 1–2 minutes to deploy on the first publish).

> **Tip:** Every subsequent `git push` to `main` automatically redeploys the site.
