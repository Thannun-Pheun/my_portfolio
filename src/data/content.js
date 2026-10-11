/**
 * ============================================================
 *  SITE CONTENT — skills, featured projects, journey
 * ============================================================
 * Everything in this file is based on real, verifiable info from
 * the GitHub account "Thannun-Pheun" (profile README + repositories).
 *
 * Rules for editing:
 *  - Only add skills you have actually used or are studying.
 *  - Only add real projects. Set `status` honestly.
 *  - Keep `icon` as a skillicons.dev id (see https://skillicons.dev).
 */

/* ------------------------------------------------------------
 * SKILLS
 * `level: 'used'`     → listed in my GitHub tech-stack (studied / used)
 * `level: 'learning'` → README says "Currently learning"
 * ---------------------------------------------------------- */
export const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'HTML', icon: 'html', level: 'used' },
      { name: 'CSS', icon: 'css', level: 'used' },
      { name: 'JavaScript', icon: 'js', level: 'used' },
      { name: 'React.js', icon: 'react', level: 'learning' },
    ],
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'PHP', icon: 'php', level: 'learning' },
      { name: 'Laravel', icon: 'laravel', level: 'learning' },
      { name: 'Node.js', icon: 'nodejs', level: 'learning' },
      { name: 'Java', icon: 'java', level: 'used' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', icon: 'mysql', level: 'used' },
      { name: 'MongoDB', icon: 'mongodb', level: 'used' },
    ],
  },
  {
    title: 'Developer Tools',
    skills: [
      { name: 'Git', icon: 'git', level: 'used' },
      { name: 'GitHub', icon: 'github', level: 'used' },
      { name: 'VS Code', icon: 'vscode', level: 'used' },
    ],
  },
]

/* ------------------------------------------------------------
 * FEATURED PROJECTS
 * Hand-curated from public repositories so descriptions stay
 * honest. `repoName` links to the live GitHub data.
 * ---------------------------------------------------------- */
export const featuredProjects = [
  {
    repoName: 'Booking_System',
    title: 'Booking System — Year 4 Final Project',
    description:
      'My final university project: a booking system shaped as a full-stack application. ' +
      'The repository is organised into two parts — BOOKING_SYSTEM_WEB (the front-end) ' +
      'and BOOKING_SYSTEM_API (the back-end API). The source currently lives in private ' +
      'sub-modules, so it will be published here once it is made public.',
    technologies: ['Front-end web app', 'REST API back-end', 'Git & GitHub'],
    status: 'private-sources', // 'live' | 'private-sources' | 'public-demo'
    isFeatured: true,
    kind: 'project',
  },
  {
    repoName: 'Thannun-Pheun',
    title: 'GitHub Profile README',
    description:
      'A custom profile page for my GitHub account, built with Markdown: an about ' +
      'section, skillicons.dev tech-stack badges, my 2026 learning goals and an ' +
      'animated contribution snake. It is my small piece of open documentation on ' +
      'who I am as a developer.',
    technologies: ['Markdown', 'GitHub', 'skillicons.dev'],
    status: 'live',
    isFeatured: false,
    kind: 'open-source',
  },
]

/* ------------------------------------------------------------
 * GOALS — taken verbatim from the "2026 Goals" section of my
 * GitHub profile README.
 * ---------------------------------------------------------- */
export const goals2026 = [
  'Complete React.js',
  'Learn Backend Development',
  'Master Git & GitHub',
  'Build 10+ Real Projects',
  'Become a Full-Stack Developer',
  'Get a Web Developer Internship',
]

/* ------------------------------------------------------------
 * LEARNING JOURNEY
 * Only milestones supported by evidence (GitHub API dates,
 * repo history, your README). No invented dates.
 * `year: null` => shown without a fabricated date.
 * ---------------------------------------------------------- */
export const journey = [
  {
    date: 'Oct 2024',
    title: 'Joined GitHub',
    text: 'Created my GitHub account and started tracking my learning with version control.',
    icon: 'github',
    done: true,
  },
  {
    date: null,
    title: 'IT Student — 4th year at Build Bright University',
    text: 'Studying Information Technology in Cambodia, with a growing focus on web development outside of class.',
    icon: 'graduation',
    done: true,
  },
  {
    date: 'Jul 2026',
    title: 'Published Booking System (Final Project)',
    text: 'Built my year-4 final project as a full-stack booking system with a separate web front-end and API back-end.',
    icon: 'rocket',
    done: true,
  },
  {
    date: 'Jul 2026',
    title: 'Built my developer profile',
    text: 'Set up my GitHub profile README and started publishing my learning journey and tech stack publicly.',
    icon: 'user',
    done: true,
  },
  {
    date: 'Next',
    title: '10+ real projects & a web-dev internship',
    text: 'My stated 2026 goals: finish React, learn backend development, master Git & GitHub, and grow into a full-stack developer.',
    icon: 'target',
    done: false,
  },
]

/* ------------------------------------------------------------
 * SNAPSHOT — fallback numbers used ONLY if the GitHub API is
 * unreachable or rate-limited (the UI then labels them
 * "snapshot"). Verified values as of 11 Oct 2026.
 * ---------------------------------------------------------- */
export const githubSnapshot = {
  public_repos: 2,
  followers: 4,
  following: 6,
  created_at: '2024-10-18T01:34:47Z',
}

/**
 * Verified repository list used only when the API is unreachable
 * (the UI labels it as a snapshot). Stats captured 11 Oct 2026.
 */
export const githubSnapshotRepos = [
  {
    id: 'snap-1',
    name: 'Thannun-Pheun',
    full_name: 'Thannun-Pheun/Thannun-Pheun',
    html_url: 'https://github.com/Thannun-Pheun/Thannun-Pheun',
    description: 'GitHub profile README — about me, my tech stack and my 2026 goals.',
    stargazers_count: 0,
    forks_count: 0,
    language: null,
    pushed_at: '2026-10-11T15:34:41Z',
  },
  {
    id: 'snap-2',
    name: 'Booking_System',
    full_name: 'Thannun-Pheun/Booking_System',
    html_url: 'https://github.com/Thannun-Pheun/Booking_System',
    description: 'Final Project year 4 — booking system with a web front-end and API back-end.',
    stargazers_count: 0,
    forks_count: 1,
    language: null,
    pushed_at: '2026-07-22T04:57:28Z',
  },
]
