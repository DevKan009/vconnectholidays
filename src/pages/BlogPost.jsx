import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import { blogPosts } from '../data/content'
import bannerImg from '../assets/images/page-banner-default.jpg'
import './BlogPost.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)
  const [submitted, setSubmitted] = useState(false)
  usePageTitle(post ? post.title : 'Blog')

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    e.target.reset()
  }

  return (
    <>
      <PageBanner title={post.title} image={bannerImg} crumb={post.title} />

      <section className="section blog-post">
        <div className="container container--narrow">
          <span className="blog-card__category">{post.category}</span>
          <h1 className="blog-post__title">{post.title}</h1>
          <p className="blog-post__date">{post.date}</p>
          <p className="blog-post__body">{post.excerpt}</p>

          <div className="blog-post__comments">
            <h2>One Response</h2>
            <article className="blog-comment">
              <strong>A WordPress Commenter</strong> says:
              <span className="blog-comment__date">May 8, 2025 at 2:07 pm</span>
              <p>
                Hi, this is a comment. To get started with moderating, editing, and deleting comments, please
                visit the Comments screen in the dashboard. Commenter avatars come from Gravatar.
              </p>
            </article>

            <h2>Leave a Reply</h2>
            <p className="blog-post__hint">Your email address will not be published. Required fields are marked *</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Comment *
                <textarea name="comment" rows="5" required />
              </label>
              <div className="contact-form__row">
                <label>
                  Name *
                  <input type="text" name="name" required />
                </label>
                <label>
                  Email *
                  <input type="email" name="email" required />
                </label>
              </div>
              <label>
                Website
                <input type="url" name="website" />
              </label>
              <label className="blog-post__checkbox">
                <input type="checkbox" name="remember" />
                Save my name, email, and website in this browser for the next time I comment.
              </label>
              <button type="submit" className="btn btn--dark">
                Post Comment
              </button>
              {submitted && (
                <p className="contact-form__status">
                  Thanks! This is a front-end demo, so comments aren&rsquo;t actually published.
                </p>
              )}
            </form>
          </div>

          <Link to="/blog" className="blog-post__back">
            &larr; Back to Blog
          </Link>
        </div>
      </section>
    </>
  )
}
