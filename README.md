# Thannun Pheun — Developer Portfolio

A modern dark-theme portfolio built with **React + Vite + Tailwind CSS +
Framer Motion + Lucide icons**, powered by **live data from the public
GitHub REST API** (no API keys or secrets involved).

> All text on the site is based only on verified information from
> `github.com/Thannun-Pheun` (profile, README and repositories). When new
> real data becomes available, it updates itself from the API.

## Tech stack

| Layer       | Tool                        |
| ----------- | --------------------------- |
| Framework   | React 18 (JavaScript, Vite) |
| Styling     | Tailwind CSS 3              |
| Icons       | Lucide React                |
| Animations  | Framer Motion               |
| Data        | GitHub public REST API      |

## Project structure

```
src/
├── config/site.js          ← EDIT ME FIRST: name, role, links, contact, CV
├── data/content.js         ← skills, featured projects, journey, snapshot
├── services/githubApi.js   ← GitHub fetch helpers (no tokens)
├── hooks/useGitHubData.js  ← loading / success / fallback / error states
├── components/
│   ├── Navbar.jsx  Hero.jsx  About.jsx  Skills.jsx
│   ├── Projects.jsx  ProjectCard.jsx  GitHubActivity.jsx
│   ├── LearningJourney.jsx  Contact.jsx  Footer.jsx
│   ├── ScrollProgress.jsx  SkillIcon.jsx
│   └── ui/                 ← Reveal, SectionHeader
└── index.css               ← design system (colors, buttons, cards)
```

## Run locally

```bash
npm install
npm run dev        # opens on http://localhost:3000
npm run build      # production build -> dist/
npm run preview    # serve the production build
```

Requires Node.js 18+.

## How to update your content

Everything editable lives in **two files**:

### 1. `src/config/site.js`
- Name, role, university, location, GitHub URL
- Contact channels (`contact.email`, `contact.phone`, `contact.linkedin`) —
  empty strings are hidden automatically
- Navigation links

### 2. `src/data/content.js`
- **Skills** — add/remove entries in `skillCategories`.
  `level: 'used'` shows a green KNOWN badge, `level: 'learning'` shows an
  amber LEARNING badge. Only list technologies you really used or study.
  The `icon` value is a [skillicons.dev](https://skillicons.dev) id
  (e.g. `react`, `php`, `laravel`, `js`, `mysql`).
- **Featured projects** — add an object to `featuredProjects` with the real
  `repoName`; the card automatically pulls live stars/forks/update-date and
  the `homepage` (Live Demo button appears **only** if you set a GitHub
  repository homepage with a working demo).
- **Journey** — add confirmed milestones to `journey`.
- **GitHub snapshot** — `githubSnapshot` / `githubSnapshotRepos` are only
  shown when the API is rate-limited. Refresh these occasionally to stay
  accurate.

### Adding your CV
1. Put your real resume as `public/cv.pdf`.
2. In `src/config/site.js` set `cv: { cvFile: '/cv.pdf' }`.
3. The "Download CV" button appears in the navbar and mobile menu.

### Adding LinkedIn later
Fill `contact.linkedin` in `src/config/site.js` with the full URL — a
LinkedIn row appears in the Contact section (edit `CHANNELS` in
`src/components/Contact.jsx` to render it; it is hidden while empty).

## Editing the design

The design system is defined in:
- `tailwind.config.js` — brand colors (`night.*`, `accent`, `accent.blue`),
  fonts, shadows.
- `src/index.css` — reusable classes: `.card`, `.btn-primary`,
  `.btn-secondary`, `.chip`, `.section-anchor`.

## Notes on the GitHub API

- Requests are unauthenticated (~60/hour **per visitor IP**) — this page
  makes 4 requests per load, so it is well within limits.
- If the API is unreachable or rate-limited, the site shows a **verified
  snapshot from 11 Oct 2026** and labels it honestly. It never shows
  fabricated statistics.
- Never add a GitHub token to this frontend.

## Deploy to Vercel (recommended)

1. Push this folder to a new GitHub repository (e.g. `portfolio`).
2. Go to <https://vercel.com/new> → **Import** that repository.
3. Vercel auto-detects **Vite**: keep the defaults
   (Build command `npm run build`, Output directory `dist`).
4. Click **Deploy**. You get a live URL like `https://portfolio-xyz.vercel.app`.
5. Every future `git push` redeploys automatically.
6. (Optional) Add a custom domain in Vercel → Settings → Domains.

### Deploy to Netlify (alternative)

1. Drag-and-drop the `dist/` folder at <https://app.netlify.com/drop>, or
2. Connect the repo: Build command `npm run build`, Publish directory `dist`.

