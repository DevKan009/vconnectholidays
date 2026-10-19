import { useEffect, useRef, useState } from 'react'

// Counts from 0 to `value` once the number scrolls into view.
// Shows the final number straight away for people who prefer reduced motion.
export default function CountUp({ value, duration = 1600 }) {
  const ref = useRef(null)
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [shown, setShown] = useState(reduced ? value : 0)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    let frame
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          setShown(Math.round((1 - Math.pow(1 - p, 3)) * value))
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration, reduced])

  return (
    <span ref={ref} aria-label={String(value)}>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}
