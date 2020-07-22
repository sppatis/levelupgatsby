import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostListing from '../components/Posts/PostListing';
import { graphql } from "gatsby"

const IndexPage = ({ data, location }) => (
  <Layout location={location}>
    <SEO title="Home" />
    <h2>Posts</h2>
    {data.allMarkdownRemark.edges.map(({node}) => (
      <PostListing key={node.id} post={node} />
    ))}
  </Layout>
)

export default IndexPage

export const query = graphql`
 query SiteMeta {
    site {
      siteMetadata {
        description
        title
      }
    }
    allMarkdownRemark(sort: {
      fields: [frontmatter___date],
      order: DESC
    }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            slug
          }
          html
          excerpt
        }
      }
    }
  }
`
