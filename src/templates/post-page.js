import React, {Fragment} from 'react';

import Layout from '../components/Layout';
import Helmet from 'react-helmet';
import SharePost from '../components/SharePost';
import Header from '../components/Header';
import {Link} from 'gatsby';

const PostPage = ({data}) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <Helmet title={`jpomykala.me - ${post.frontmatter.title}`}/>
      <div className="back-top-container sticky-top">
        <Link to={'/'}>
          <div className="back-top">
            <i className="fal fa-chevron-left"/>
            Back to homepage
          </div>
        </Link>
      </div>

      <div className="post">
        <img
          className="post__image_header"
          src={post.frontmatter.image.publicURL}
          alt="header"
        />
        <div className="post-header">
          <h1
            className="post__title"
            dangerouslySetInnerHTML={{__html: post.frontmatter.title}}
          />
          <h3 className="post__date">{post.frontmatter.date}</h3>

          <div className="post__tags">

            {' '}
            {post.frontmatter.tags.map(tag => (
              <Fragment key={tag}>
                <i className="fal fa-tag"/>{' '}<Link to={`/tags/${tag}`}>{tag}</Link>{' '}
              </Fragment>
            ))}
          </div>
        </div>
        <article
          className="post-width"
          dangerouslySetInnerHTML={{__html: post.html}}/>
      </div>
      <div className="d-flex justify-content-center">
        <div className="post-width">
          <SharePost post={post}/>
        </div>
      </div>
      <div className="d-flex justify-content-center back-link">
        <Link to={'/'}>All posts</Link>
      </div>
      <Header/>
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
                date(formatString: "MMMM DD, YYYY")
                path
                title
                tags
                image {
                    publicURL
                }
            }
        }
    }
`;
