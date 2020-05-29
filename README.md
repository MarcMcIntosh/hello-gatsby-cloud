# Prismic + Gatsby cloud integration project

Test site to manually integrate prismic with gatsby cloud.


## Setup the project
Init a project using gatsby cli
```bash
npx gatsby new my-awesome-site

cd my-awesome-site

npm install --save  \
  prismic-javascript \
  prismicio/gatsby-source-prismic#release-id-gatsby-cloudd-dist 

mkdir src/schemas src/prismic
```
+ Create a new [prismic](https://prismic.io) repository or use an existing one.
+ Go to the custom type editor, create a custom type or select and existing one and copy the JSON from from the editor into the schemas directory.

+ Do this for all of the custom types in the prismic repository.

+ Write some content and publish.

### Adding content and deploying a build

Add a link resolver
```js
// src/prismic/linkResolver.js
module.exports = ({ node, key, value } = {}) => doc => {
   switch(doc.type) {
      // case "homepage": return '/';
      // case "page: return `${doc.uid}`;
      // add more as required.
      default: return "/";
    }
}
```

Environment variables and configure `gatsby-source-prismic`
```js
// gatsby-config.js

process.env.PRISMIC_REPO_NAME = process.env.PRISMIC_REPO_NAME || "my-prismic-repository"
process.env.PRISMIC_API_KEY = process.env.PRISMIC_API_KEY || "my-api-key"

const linkResolver = require("./src/prismic/linkResolver");

const gastbySourcePrismicConfig = {
  resolve: 'gatsby-source-prismic',
  options: {
    repositoryName: process.env..PRISMIC_REPO_NAME,
    linkResolver,
    schemas: {
      // Custom types mapped to schemas
      homepage: require("./src/schemas/homepage.json")
    },
  }
};

module.exports = {
  // ... site config
  plugins: [
    // ... plugin config
    gastbySourcePrismicConfig,
  ]
}

```

Retrieve data from prismic
```jsx
// src/pages/index.js
import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout"

export const query = graphql`{ prismicHomepage { id, uid, data { title { text } } } }`;

const Homepage = ({ data }) => (
  <Layout>
    <h1>{data.prismicHomepage.data.title.text}</h1>)
  </Layout>
);

Homepage.query = query

export default Homepage
```

__Check the project runs and the commit and push to git__

+ Go to gatsby cloud  and `create new site` select `I already have a gatsby-site` and find select the repo
+ Set env vars using the UI

+ go to settings copy and set up webhooks in prismic one for the urls one for build and one for release (optional config of releases?)

### Preview a release with gatsby cloud

From the copy gatbsy website, copy the preview url in to prismic previews and add a preview path (default in `/previews`) and give it a name such as gatsby-cloud-preview.

Then edit some content save and select save in a release, create a new release if need be and copy the release id from the url (add picture).

Add the preview path, and release id for use in a development site using either the gatsby cloud ui, dotenv or directly through `gatsby-config.js`.


```js
// gatsby-config.js
process.env.PRISMIC_REPO_NAME = process.env.PRISMIC_REPO_NAME || "my-prismic-repository"
process.env.PRISMIC_API_KEY = process.env.PRISMIC_API_KEY || "my-api-key" // consider using dotenv for this
process.env.PRISMIC_PREVIEW_PATH = process.env.PRISMIC_PREVIEW_PATH || "/previews"
process.env.PRISMIC_RELEASE_ID = process.env.PRSIMIC_RELEASE_ID || "Xny9FRAAAB4AdbNo"

const linkResolver = require("./src/prismic/linkResolver");

const gastbySourcePrismicConfig = {
  resolve: 'gatsby-source-prismic',
  options: {
    repositoryName: process.env..PRISMIC_REPO_NAME,
    // conditionally using content from a release.
    releaseID: (process.env.GATSBY_CLOUD && process.env.NODE_ENV === 'development') ? process.env.PRISMIC_RELEASE_ID : undefined,
    linkResolver,
    schemas: {
      // Custom types mapped to schemas
      homepage: require("./src/schemas/homepage.json")
    },
  }
};
```

Write a redirection handler for previews.
```js
import React from 'react';
import { navigate  } from 'gatsby';

import { linkResolver } from '../prismic';
import { getApi } from 'prismic-javascript';

const Previews = ({
    location: { search },
    pageContext: { repositoryName, accessToken },
}) => {

    const params = new URLSearchParams(search);
    const documentId = params.get('documentId');

    if(!documentId) return navigate('/');

    getApi(`https://${repositoryName}.prismic.io/api/v2`, { accessToken })
        .then((api) => api.getByID(documentId))
        .then(linkResolver())
        .then((path) => navigate(path || '/'))
        .catch(() => navigate('/'));

    return <div>Loading preview...</div>
}

export default Previews
```

Create a preview path when running in development.
```js
// gatsby-node.js
const path = require('path');
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  
  const {
    NODE_ENV,
    GATSBY_CLOUD,
    PRISMIC_RELEASE_ID,
    PRISMIC_PREVIEW_PATH,
    PRISMIC_API_KEY,
    PRISMIC_REPO_NAME,
  } = process.env;

  // create a preview path only in development
  if (PRISMIC_RELEASE_ID && PRISMIC_PREVIEW_PATH && NODE_ENV === 'development' /* && GATSBY_CLOUD */) {
    createPage({
      path: PRISMIC_PREVIEW_PATH,
      component: path.resolve(__dirname, 'src/templates/previews.js'),
      context: {
        repositoryName: PRISMIC_REPO_NAME,
        apiKey: PRISMIC_API_KEY,
      },
    });
  }
}
```

Finally push the changes to github
