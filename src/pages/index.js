import React from 'react';
import '../assets/scss/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import PostHero from '../components/PostHero';
import Header from '../components/Header';

const IndexPage = ({data}) => {
  const edges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Header/>
      {edges.map(edge => edge.node.frontmatter).map(p => (
        <PostHero data={p}/>
      ))}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
    {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { date: { ne: null } } }
            limit: 1000
        ) {
            edges {
                node {
                    frontmatter {
                        date(formatString: "YYYY-MM-DD")
                        title
                        path
                        tags
                        image {
                            publicURL
                        }
                    }
                }
            }
        }
    }
`;
