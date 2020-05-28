/*require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})*/


process.env.PRISMIC_REPO_NAME = 'gatsby-hello'
// enable refreshing one changes have been made to the CMS
process.env.ENABLE_GATSBY_REFRESH_ENDPOINT = process.env.NODE_ENV === 'development';
// emulate gastby cloud, cloud be useful
process.env.GATSBY_CLOUD = process.env.GATSBY_CLOUD === undefined
// for gatsby cloud previews
process.env.RELEASE_ID = "Xny9FRAAAB4AdbNo"
// path for previews 
process.env.PREVIEW_PATH = "/previews"; // prismic's default

const linkResolver = require("./src/prismic/linkResolver");

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        // Could be a env variable
        repositoryName: process.env.PRISMIC_REPO_NAME,
        linkResolver,
        releaseID: process.env.GATSBY_CLOUD && process.env.NODE_ENV === 'development' && process.env.RELEASE_ID,
        schemas: {
          // Your custom types mapped to schemas
          homepage: require("./src/schemas/homepage.json"),
          about: require('./src/schemas/about.json'),
          contact: require("./src/schemas/contact.json"),
          blog_post: require("./src/schemas/blog_post.json"),
          footer: require("./src/schemas/footer.json"),
        },
      }
    }
  ],
}
