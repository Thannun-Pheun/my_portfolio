import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GitHubActivity from './components/GitHubActivity'
import LearningJourney from './components/LearningJourney'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useGitHubData from './hooks/useGitHubData'

/**
 * App — loads GitHub data once, then shares it with the sections
 * that need it (Hero stats + GitHub activity + project cards).
 */
export default function App() {
  const { status, data, error } = useGitHubData()
  const repos = status === 'success' || status === 'fallback' ? data.repos || [] : []

  return (
    <>
      {/* Keyboard users can jump straight to content */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />
      <ScrollProgress />

      <main>
        <Hero ghData={{ status, data }} />
        <About />
        <Skills />
        <Projects repos={repos} />
        <GitHubActivity status={status} data={data} error={error} />
        <LearningJourney />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
