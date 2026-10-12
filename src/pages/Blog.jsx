import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import BlogTeaser from '../components/BlogTeaser'
import bannerImg from '../assets/images/page-banner-default.jpg'

export default function Blog() {
  usePageTitle('Blog')

  return (
    <>
      <PageBanner title="Blog" image={bannerImg} />
      <section className="section">
        <div className="container">
          <SectionHeading
            before="Read Our Latest Blog &amp;"
            highlight="Articles"
            description="Following is a detailed blog article on our Tours and travel topics"
          />
          <BlogTeaser />
        </div>
      </section>
    </>
  )
}
