export default function SectionHeading({ before, highlight, after, description, light = false, align = 'center' }) {
  return (
    <div
      className={`section-heading ${light ? 'section-heading--light' : ''}`}
      style={{ textAlign: align, margin: align === 'left' ? '0 0 60px' : undefined }}
    >
      <h2>
        {before ? `${before} ` : ''}
        {highlight && <span className="accent">{highlight}</span>}
        {after ? ` ${after}` : ''}
      </h2>
      {description && <p>{description}</p>}
    </div>
  )
}
