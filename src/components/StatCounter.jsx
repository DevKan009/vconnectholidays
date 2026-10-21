import { useEffect, useRef, useState } from 'react'
import './StatCounter.css'

function useCountUp(target, start) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let frame
    const duration = 1600
    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target])

  return value
}

function Stat({ value, suffix, label }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const count = useCountUp(value, visible)

  return (
    <div className="stat" ref={ref}>
      <span className="stat__value">
        {count}
        <span className="stat__suffix">{suffix.trim()}</span>
      </span>
      <span className="stat__label">{label}</span>
    </div>
  )
}

export default function StatCounter({ items }) {
  return (
    <div className="stat-counter">
      {items.map((item) => (
        <Stat key={item.label} {...item} />
      ))}
    </div>
  )
}
