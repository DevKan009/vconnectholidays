import { useEffect, useState } from 'react'
import Button from './Button'
import heroRiga from '../assets/images/hero-riga.jpg'
import heroHeritage from '../assets/images/hero-heritage.jpg'
import heroNyc from '../assets/images/hero-nyc.jpg'
import './Hero.css'

const SLIDES = [heroRiga, heroHeritage, heroNyc]

export default function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero">
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className={`hero__slide ${i === active ? 'is-active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="hero__overlay" />

      <div className="container hero__content">
        <div className="hero__heading-block">
          <span className="hero__badge">#1 The Best Travel Agency</span>
          <h1>
            Unlock The Wonders Of The <span className="accent">World</span> With VConnect Holidays
          </h1>
        </div>
        <div className="hero__footer-row">
          <p>
            Welcome to VConnect Holidays, a premier tour and travel agency committed to transforming your
            travel dreams into reality.
          </p>
          <Button to="/destination" variant="outline-light">
            Explore Now
          </Button>
        </div>
      </div>
    </section>
  )
}
