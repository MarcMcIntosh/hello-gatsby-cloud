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

const TIME = new Date();

const BlogPost = ({ data }) => (
    <Layout>
        <RichText render={data.prismicBlogPost.data.ritchtext.raw} />
        <h2>Built on {TIME.toISOString()}</h2>
    </Layout>
)


export default BlogPost
