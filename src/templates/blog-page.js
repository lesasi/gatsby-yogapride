import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPageTemplate = ({ data: { previous, next, page } }) => {
 

  return (
    <Layout>
      <SEO title={page.title} description={"dsds"} />

      <article
        className="blog-page"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{parse(page.title)}</h1>

          <p>{page.date}</p>

      
        </header>

        {!!page.content && (
          <section itemProp="articleBody">{parse(page.content)}</section>
        )}

        <hr />

        <footer>
          <Bio />
        </footer>
      </article>

      <nav className="blog-page-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ← {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query BlogpageById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previouspageId: String
    $nextpageId: String
  ) {
    # selecting the current page by id
    page: wpPage(id: { eq: $id }) {
      id      
      content
      title
      date(formatString: "MMMM DD, YYYY")       
    }

    # this gets us the previous page by id (if it exists)
    previous: wpPage(id: { eq: $previouspageId }) {
      uri
      title
    }

    # this gets us the next page by id (if it exists)
    next: wpPage(id: { eq: $nextpageId }) {
      uri
      title
    }
  }
`
