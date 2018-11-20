import React from 'react';
import moment from 'moment';
import {Link} from '@reach/router';

const PostHero = ({data}) => {
  const image = data.image.publicURL;
  return (
    <div className="post-hero">
      <Link to={data.path}>
        <img src={image}/>
        <div className="post-hero__container">
          <h1 className="post-hero__title" dangerouslySetInnerHTML={{__html: data.title}}/>
          <h5 className="post-hero__date">{moment(data.date).fromNow()}</h5>
        </div>
      </Link>
    </div>
  );
};

export default PostHero;
