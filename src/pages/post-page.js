import React, { Fragment } from 'react';

import Layout from '../components/Layout';
import Helmet from 'react-helmet';
import SharePost from '../components/SharePost';
import Header from '../components/Header';
import 'prismjs/themes/prism-tomorrow.css';
import { Link } from 'gatsby';

const PostPage = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <Helmet title={`jpomykala.me - ${post.frontmatter.title}`} />
      <div className="back-top-container sticky-top">
        <Link to={'/'}>
          <div className="back-top">
            <i className="fal fa-chevron-left" />
            Back to homepage
          </div>
        </Link>
      </div>

      <div className="post">
        <img
          src={post.frontmatter.image.publicURL}
          srcSet={post.frontmatter.image.childImageSharp.sizes.srcSet}
          alt="header"
        />
        <div className="post-header">
          <h1
            className="post-title"
            dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
          />

          <div className="post-tags">
            {post.frontmatter.categories.map(category => (
              <Fragment key={category}>
                <Link to={`/tags/${category}`}>{category}</Link>{' '}
              </Fragment>
            ))}
          </div>
          <h3 className="post-date">{post.frontmatter.date}</h3>
        </div>
        <article dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <div className="d-flex justify-content-center">
        <div className="w-50">
          <SharePost post={post} />
        </div>
      </div>
      <div className="d-flex justify-content-center back-link">
        <Link to={'/'}>All posts</Link>
      </div>
      <Header />
    </Layout>
  );
};

export default PostPage;

// language=GraphQL
export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
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
`;
