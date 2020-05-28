/**
 * Load eviroment variables from either
 * .env.production
 * or
 * .env.development
 * 
 * Gatsby cloud will allow these env to be configured on their website
 * 
 * process.env.PRISMIC_REPO_NAME = "gatsby-hello"
 * 
 * process.env.PRISMIC_API_KEY="MC5Ycy1rc3hFQUFDUUFLQXUt.ImpS77-977-977-977-977-977-977-9Te-_ve-_vTvvv71fCO-_vXBl77-977-9ZHTvv73vv73vv70677-9DxBl"
 * 
 * For redirecting from prismic to the page on gatsby-preview
 * process.env.PRISMIC_PREVIEW_PATH="/previews"
 * 
 * Release to preview
 * process.env.PRISMIC_RELEASE_ID="Xny9FRAAAB4AdbNo"
 * */

!process.env.GATSBY_CLOUD && require("dotenv").config({ path: `.env.${process.env.NODE_ENV}`});


const linkResolver = require("./src/prismic/linkResolver");

const {
  NODE_ENV,
  GATSBY_CLOUD,

  PRISMIC_REPO_NAME,
  PRISMIC_RELEASE_ID,
} = process.env;

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
        repositoryName: PRISMIC_REPO_NAME,
        linkResolver,
        releaseID: (GATSBY_CLOUD && NODE_ENV === 'development') ? PRISMIC_RELEASE_ID : undefined,
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
