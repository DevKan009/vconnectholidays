import { useRef } from 'react'
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from 'react-icons/fa6'
import './TestimonialSlider.css'

export default function TestimonialSlider({ items }) {
  const trackRef = useRef(null)

  function scrollByCard(direction) {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.testimonial-card')
    const amount = card ? card.offsetWidth + 24 : 320
    track.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <div className="testimonial-slider">
      <div className="testimonial-slider__track" ref={trackRef}>
        {items.map((item) => (
          <article className="testimonial-card" key={item.name}>
            <FaQuoteLeft className="testimonial-card__quote" aria-hidden="true" />
            <p>{item.quote}</p>
            <div className="testimonial-card__bio">
              <img src={item.image} alt={item.name} loading="lazy" />
              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="testimonial-slider__controls">
        <button type="button" aria-label="Previous testimonials" onClick={() => scrollByCard(-1)}>
          <FaArrowLeft />
        </button>
        <button type="button" aria-label="Next testimonials" onClick={() => scrollByCard(1)}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}
