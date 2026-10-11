/**
 * ============================================================
 *  SITE CONFIG — the single place to edit your personal info
 * ============================================================
 * Everything here is shown across the whole site.
 * Only add information that is real and verified.
 */

export const GITHUB_USERNAME = 'Thannun-Pheun'

export const profile = {
  name: 'Thannun Pheun',            // Displayed name
  shortName: 'Thannun',             // Used in the navbar logo
  role: 'IT Student & Aspiring Web Developer',
  location: 'Battambang, Cambodia', // From your GitHub profile README
  university: 'Build Bright University',
  degree: 'Bachelor\'s Degree, Information Technology (4th year)',
  // Fallback avatar if the GitHub API is rate limited / offline.
  avatarUrl: 'https://avatars.githubusercontent.com/u/185444949?v=4',
  githubUrl: 'https://github.com/Thannun-Pheun',
}

/**
 * Contact channels. Only what you have publicly shared in your
 * GitHub profile README is listed here. Add LinkedIn, etc. later
 * by filling in the matching entry — the UI hides empty ones.
 */
export const contact = {
  email: 'thannunph@gmail.com', // Published by you in your profile README
  phone: '+855 15 255 675',    // Published by you in your profile README
  linkedin: '',                 // Add only when you create a real profile
}

/**
 * Career goal + motivation, taken from your GitHub profile README.
 * Feel free to rewrite — keep it honest.
 */
export const quotes = {
  tagline:
    'I enjoy learning web technologies and building practical projects that turn ideas into useful digital experiences.',
  favorite:
    "Success doesn't come from what you know. It comes from what you build and never giving up.",
}

/**
 * CV / resume: leave `cvFile` as null until you add a real PDF.
 * When ready: put `cv.pdf` into the /public folder and set
 * cvFile to '/cv.pdf'. The "Download CV" button appears automatically.
 */
export const cv = {
  cvFile: null,
}

/** Navigation links (section ids must match the `id` of each <section>) */
export const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'GitHub', id: 'github' },
  { label: 'Journey', id: 'journey' },
  { label: 'Contact', id: 'contact' },
]
