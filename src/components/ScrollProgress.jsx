import { motion, useScroll, useSpring } from 'framer-motion'

/** Reading-progress bar pinned under the navbar. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-16 z-40 h-0.5 origin-left bg-gradient-to-r from-accent to-accent-blue"
    />
  )
}
