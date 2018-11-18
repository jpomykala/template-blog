import React from "react";
import {Link} from "@reach/router";

const PostItem = ({post}) => (
  <div className="post-item">
    <Link to={post.path}>
      <div className="row">
        <div className="col-6">
          <h1 className="post-item__title">{post.title}</h1>
          <h3 className="post-item__date">{post.date}</h3>
        </div>
        <div className="col-6">
          <p className="post-item__excerpt">
            {post.excerpt}
          </p>
        </div>
      </div>
      <div className="clearfix"></div>
    </Link>
  </div>
);

export default PostItem;
