import React, {Fragment} from "react";
import PostItem from "./PostItem";

const PostItemList = ({items = []}) => (
  <Fragment>
    {items.map(({node}) => {
      const slug = node.fields.slug;
      return (
        <PostItem key={slug} link={slug} post={node.frontmatter}/>
      )
    })}
  </Fragment>
);

export default PostItemList;
