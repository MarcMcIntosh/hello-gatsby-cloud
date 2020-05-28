import React from 'react';
import { navigate  } from 'gatsby';

import { linkResolver } from '../prismic';
import { getApi } from 'prismic-javascript'

const Previews = (props) => {

    const params = new URLSearchParams(props.location.search);
    const documentId = params.get('documentId');

    if(!documentId) return navigate('/');

    
    // this could also be retrieved from the token url.
    getApi(`https://${props.pageContext.repositoryName}.prismic.io/api/v2`, { accessToken: process.env.PRISMIC_API_TOKEN })
        .then((api) => api.getByID(documentId))
        .then(linkResolver())
        .then((path) => navigate(path || '/'))
        .catch(() => navigate('/'));

    return <div>Loading preview...</div>
}

export default Previews
