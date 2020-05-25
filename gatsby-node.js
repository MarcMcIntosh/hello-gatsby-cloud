/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // Query all Pages with their IDs and template data.
    const pages = await graphql(`
      {
        allPrismicBlogPost {
          nodes {
            id
            uid
            lang
          }
        }
      }
    `)

    // Create pages for each Page in Prismic using the selected template.
    pages.data.allPrismicBlogPost.nodes.forEach(node => {
      const prefix = node.lang === "en-gb" ? "" : "/" + node.lang;
      createPage({
        path: `${prefix}/blog/${node.uid}`,
        component: path.resolve(__dirname, 'src/templates/BlogPost.js'),
        context: {
          id: node.id,
          lang: node.lang,
          uid: node.uid,
        },
      })
    })
  }

