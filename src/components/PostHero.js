import React from 'react';
import moment from 'moment';
import {Link} from '@reach/router';

const PostHero = ({data}) => {
  const image = data.image.publicURL;
  const background = `radial-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.5)), url('${image}')`;
  const backgroundStyle = {background};
  return (
    <div className="post-hero" style={backgroundStyle}>
      <div className="content-container">
        <Link to={data.path}>
          <h1 className="post-hero__title" dangerouslySetInnerHTML={{__html: data.title}}/>
        </Link>
        <h5 className="post-hero__date">{moment(data.date).fromNow()}</h5>
      </div>
    </div>
  );
};

export default PostHero;
