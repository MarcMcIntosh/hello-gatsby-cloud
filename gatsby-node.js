/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');



exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // discuss when to use gatsby-previews, should we allow users to use previews locally?
    // here we will create previews only on gatsby for a release
    if (process.env.RELEASE_ID && process.env.GATSBY_CLOUD && process.env.NODE_ENV === 'development') {
      createPage({
        path: process.env.PREVIEW_PATH,
        component: path.resolve(__dirname, 'src/templates/previews.js'),
        context: {
          repositoryName: process.env.PRISMIC_REPO_NAME,
        },
      });
    }

    
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

