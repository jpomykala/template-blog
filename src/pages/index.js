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
      {edges.map(edge => edge.node).map(node => {
        return (
          <PostHero
            key={node.frontmatter.title}
            link={node.fields.slug}
            data={node.frontmatter}/>
        );
      })}
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
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "YYYY-MM-DD")
                        title
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
