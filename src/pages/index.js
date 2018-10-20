import React from 'react';
import '../assets/scss/post.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Header from '../components/Header';

const IndexPage = ({ data }) => {
  const edges = data.allMarkdownRemark.edges;

  console.log(data);
  return (
    <Layout>
      <Header />
      {edges.map(edge => edge.node.frontmatter).map(p => (
        <Post data={p} />
      ))}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            path
            title
            categories
            image {
              publicURL
              childImageSharp {
                sizes(maxWidth: 1240) {
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`;
