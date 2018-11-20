import React, {Fragment} from 'react';

import Layout from '../components/Layout';
import Helmet from 'react-helmet';
import SharePost from '../components/SharePost';
import Header from '../components/Header';
import {graphql, Link} from 'gatsby';
import HomeLink from "../components/HomeLink";
import PostItemList from "../components/PostItemList";

const Post = ({data, pageContext}) => {
  const post = data.markdownRemark;
  const {relevantPosts} = pageContext;

  return (
    <Layout>
      <Helmet title={post.frontmatter.title}/>

      <div className="post">
        <img
          className="post__image_header"
          src={post.frontmatter.image.publicURL}
          alt="header"
        />
        <div className="post__container">
          <header>
            <HomeLink className="post__home-link"/>
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
          </header>
          <article
            dangerouslySetInnerHTML={{__html: post.html}}/>
          <div className="d-flex justify-content-center">
            <SharePost post={post}/>
          </div>

          {relevantPosts.length !== 0 && <div className="similar-posts mb-5">
            <h1 className="page__header pb-2">Similar posts</h1>
            <PostItemList
              items={relevantPosts}
            />
          </div>}

        </div>
      </div>
      <Header/>
    </Layout>
  );
};

export default Post;

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
