import React from 'react';

const SharePost = ({ post }) => {
  const title = post.frontmatter.title;
  const url = post.frontmatter.path;
  return (
    <div className="row post-share my-5">
      <div className="col-12 justify-content-center text-center">
        <h1>
          <cite>{title}</cite>
        </h1>
      </div>
      <a
        className="col-12 col-md-4"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/intent/tweet?text=${title} ${url}`}
      >
        <div className="btn-share btn-twitter text-center">
          <i className="fab fa-twitter" /> Share
        </div>
      </a>
      <a
        className="col-12 col-md-4"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.reddit.com/submit?url=${url}&title=${title}`}
      >
        <div className=" btn-share btn-reddit text-center">
          <i className="fab fa-reddit-alien" /> Create
        </div>
      </a>
      <a
        className="col-12 col-md-4"
        target="_blank"
        rel="noopener noreferrer"
        href={`http://www.facebook.com/sharer/sharer.php?u=${url}`}
      >
        <div className=" btn-share btn-facebook text-center">
          <i className="fab fa-facebook" /> Post
        </div>
      </a>
    </div>
  );
};

export default SharePost;
