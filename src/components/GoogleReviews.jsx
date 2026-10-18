import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaStar, FaXmark, FaArrowRight } from 'react-icons/fa6'
import { googleBusiness, googleReviews, reviewPhotos } from '../data/googleReviews'
import './GoogleReviews.css'

function Stars({ size = 15 }) {
  return (
    <span className="g-stars" aria-label="Rated 5 out of 5" role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar key={i} size={size} aria-hidden="true" />
      ))}
    </span>
  )
}

function ReviewCard({ review, onPhoto }) {
  const [expanded, setExpanded] = useState(false)
  const long = review.text.length > 260
  const shown = review.photos.slice(0, 3)
  const extra = review.photos.length - shown.length

  return (
    <article className="g-review">
      <header className="g-review__head">
        <img src={review.avatar} alt="" className="g-review__avatar" loading="lazy" width="44" height="44" />
        <div className="g-review__who">
          <strong>{review.name}</strong>
          <span>{review.meta}</span>
        </div>
        <FcGoogle className="g-review__g" aria-label="Google review" />
      </header>

      <div className="g-review__rating">
        <Stars size={14} />
        <span>{review.date}</span>
      </div>

      <p className={`g-review__text ${long && !expanded ? 'is-clamped' : ''}`}>{review.text}</p>
      {long && (
        <button type="button" className="g-review__more" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {shown.length > 0 && (
        <div className="g-review__photos">
          {shown.map((src, i) => (
            <button
              type="button"
              key={src}
              onClick={() => onPhoto(src)}
              aria-label={`Open photo ${i + 1} from ${review.name}'s review`}
            >
              <img src={src} alt="" loading="lazy" />
              {i === shown.length - 1 && extra > 0 && <span className="g-review__extra">+{extra}</span>}
            </button>
          ))}
        </div>
      )}
    </article>
  )
}

export default function GoogleReviews({ initialCount = 6 }) {
  const [count, setCount] = useState(initialCount)
  const [lightbox, setLightbox] = useState(null)
  const visible = googleReviews.slice(0, count)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => e.key === 'Escape' && setLightbox(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <section className="section g-reviews" id="reviews">
      <div className="container">
        <div className="g-reviews__top">
          <div className="g-reviews__heading">
            <h2>
              Amazing Reviews From Our <span className="accent">Travelers</span>
            </h2>
            <p>Read authentic experiences and reviews from happy travelers who explored the world with us.</p>
          </div>

          <div className="g-summary">
            <div className="g-summary__brand">
              <FcGoogle size={30} aria-hidden="true" />
              <span>Google Reviews</span>
            </div>
            <div className="g-summary__score">
              <strong>{googleBusiness.rating.toFixed(1)}</strong>
              <div>
                <Stars size={18} />
                <span>Based on {googleBusiness.reviewCount} reviews</span>
              </div>
            </div>
            <div className="g-summary__actions">
              <a href={googleBusiness.reviewsUrl} target="_blank" rel="noreferrer" className="g-btn g-btn--solid">
                See all reviews
              </a>
              <a href={googleBusiness.writeReviewUrl} target="_blank" rel="noreferrer" className="g-btn">
                Write a review
              </a>
            </div>
          </div>
        </div>

        <div className="g-photos" aria-label="Photos shared by travellers on Google">
          <span className="g-photos__label">Photos from our travellers on Google</span>
          <div className="g-photos__strip">
            {reviewPhotos.map((p, i) => (
              <button type="button" key={p.src} onClick={() => setLightbox(p.src)} aria-label={`Open photo ${i + 1} by ${p.name}`}>
                <img src={p.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className={`g-reviews__grid ${count > initialCount ? 'is-expanded' : ''}`}>
          {visible.map((r) => (
            <ReviewCard key={r.slug} review={r} onPhoto={setLightbox} />
          ))}
        </div>

        <div className="g-reviews__footer">
          {count < googleReviews.length ? (
            <button type="button" className="g-btn" onClick={() => setCount(googleReviews.length)}>
              Show more reviews
            </button>
          ) : null}
          <a href={googleBusiness.reviewsUrl} target="_blank" rel="noreferrer" className="g-reviews__all">
            Read all {googleBusiness.reviewCount} reviews on Google <FaArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>

      {lightbox && (
        <div className="g-lightbox" role="dialog" aria-label="Review photo" onClick={() => setLightbox(null)}>
          <button type="button" className="g-lightbox__close" aria-label="Close photo" onClick={() => setLightbox(null)}>
            <FaXmark />
          </button>
          <img src={lightbox} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}
