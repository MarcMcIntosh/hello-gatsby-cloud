import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export const query = graphql`{
  prismicHomepage {
      id
      data {
        featured_post {
          document {
            ... on PrismicBlogPost {
              id
              url
              data {
                ritchtext {
                  raw
                }
              }
            }
          }
        }
        title {
          html
          text
        }
      }
  }
  allPrismicBlogPost {
    edges {
      node {
        id
        url
      }
    }
  }
}`;


const IndexPage = ({ data }) => {
  const homePageData = data.prismicHomepage.data

  const timestamp = new Date()

  return (<Layout>
    <SEO title="Home" />
    <h1>{homePageData.title.text}</h1>
    <h2>Built on {timestamp.toISOString()}</h2>

    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    {/* <Link to="/page-2/">Go to page 2</Link> */}


    <div>
      <h2>Blog</h2>
        <ul>
          
          { data.allPrismicBlogPost.edges.map(e => (
            <li key={e.node.id}><Link to={e.node.url}>{e.node.url}</Link></li>
          ))}
        </ul>
      </div>
  </Layout>)
}

export default IndexPage
