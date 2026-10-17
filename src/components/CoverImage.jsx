import { useState } from 'react'
import './CoverImage.css'

// Lazy-loaded photo that falls back to a gold placeholder with a label when
// the file is missing, so destinations can go live before their photos do.
export default function CoverImage({ src, alt, label, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`cover-image ${className}`.trim()}>
      {failed ? (
        <span className="cover-image__placeholder" aria-hidden="true">
          {label || alt}
        </span>
      ) : (
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />
      )}
    </div>
  )
}
