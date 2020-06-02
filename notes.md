
https://www.gatsbyjs.com/docs/managing-environment-variables/


#Instruction examples
https://www.gatsbyjs.com/docs/agility-cms/getting-started/
https://www.gatsbyjs.com/docs/strapi/getting-started/
https://www.gatsbyjs.com/docs/kontent/getting-started/
https://www.gatsbyjs.com/docs/drupal/getting-started/
https://www.gatsbyjs.com/docs/contentstack/getting-started/


#TODO
[x] Set webhook for build
[x] set webhook for previews
[x] Previews: the gatsby way
    [] add preview url to prismic (may have to be /)
    [-] add preview route / page
    [-] fetch preview api
    [x] configure webhooks
    [x] preview routes is previews by default in prismic, should this be configurable?
[x] Build
    [x] confifgure webhooks
[x] Incremental builds


## Other docs
+ https://www.gatsbyjs.com/docs/agility-cms/getting-started/
+  Build a preview route
    + https://www.gatsbyjs.org/docs/routing/#creating-routes
    +  https://www.gatsbyjs.org/docs/actions/#createPage 
    +  https://www.gatsbyjs.org/docs/creating-and-modifying-pages
    + https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication/
    + https://reach.tech/router
    + https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement
    + https://www.gatsbyjs.org/docs/browser-apis/#wrapPageElement
    + https://www.gatsbyjs.org/docs/actions/#setPageData
    + https://www.gatsbyjs.org/docs/data-fetching/#fetching-data-at-client-side-runtime
    + https://www.gatsbyjs.org/docs/running-a-gatsby-preview-server/
    + https://www.gatsbyjs.org/docs/environment-variables/#reserved-environment-variables
    + https://www.gatsbyjs.org/docs/actions/#createPage
    + https://www.gatsbyjs.org/docs/browser-apis/#wrapPageElement
    + https://www.gatsbyjs.org/docs/layout-components/#other-resources
### ideas
Eviroment varibales to include in a dotenv file?
Repo name,
api key,

Both will need
+ Preview Environment variables
+ Builds Environment variables

For previews we could
use wrapElement to create a client side store, and feed data through a preview page or a redirect.
Or create a preview page that and renders the component with new data,

It would be nice to be able to test gatsby previews with this project :/ because then we could fetch all the data from prismic and render previews 

usePrismicPreviews already provides a store on the window, maybe using this would be best?
https://github.com/angeloashmore/gatsby-source-prismic/blob/master/src/constants.ts



Onservations
+ previews wil have to fetch the new api?
