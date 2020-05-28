/**
 * Load eviroment variables from either
 * .env.production
 * or
 * .env.development
 * 
 * */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


// enable localhost:8000/__refresh to refetch data
// process.env.ENABLE_GATSBY_REFRESH_ENDPOINT = process.env.NODE_ENV === 'development';

// set to true we running in gatsby cloud
// process.env.GATSBY_CLOUD = process.env.GATSBY_CLOUD === undefined


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
        releaseID: GATSBY_CLOUD && NODE_ENV === 'development' && PRISMIC_RELEASE_ID,
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
