import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout";
import { RichText } from "prismic-reactjs";

export const query = graphql`
    query($id: String!) {
        prismicBlogPost(id: { eq: $id }) {
            data {
                ritchtext {
                    html
                    text
                    raw
                }
            }
        }
    }
`

const BlogPost = ({ data }) => {
    // console.log('----------blog props------------', { props })
    console.log('BlogPost.js');
    console.log({ data });
    const timestamp = new Date();
    return (
        <Layout>
            <RichText render={data.prismicBlogPost.data.ritchtext.raw} />
            <h2>Built on {timestamp.toISOString()}</h2>
        </Layout>
    )
}

export default BlogPost
