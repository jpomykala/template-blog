import React, {Fragment} from "react";
import PostItem from "./PostItem";

const PostItemList = ({items = []}) => (
  <Fragment>
    {items.map(({node}) => {
      const {path} = node.frontmatter;
      return (
        <PostItem key={path} post={node.frontmatter}/>
      )
    })}
  </Fragment>
);

export default PostItemList;
