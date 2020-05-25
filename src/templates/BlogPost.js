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
    return (
        <Layout>
            <RichText render={data.prismicBlogPost.data.ritchtext.raw} />
        </Layout>
    )
}

export default BlogPost
