import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import { blogPosts } from '../data/content'
import './BlogTeaser.css'

export default function BlogTeaser() {
  return (
    <div className="blog-teaser-grid">
      {blogPosts.map((post) => (
        <article className="blog-card" key={post.slug}>
          <span className="blog-card__category">{post.category}</span>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <Link to={`/blog/${post.slug}`} className="blog-card__link">
            Read More <FaArrowRight />
          </Link>
        </article>
      ))}
    </div>
  )
}
