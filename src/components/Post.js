import React from 'react';
import moment from 'moment';
import { Link } from '@reach/router';

const Post = ({ data }) => {
  const image = data.image.publicURL;
  const background = `radial-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.8)), url('${image}')`;
  const backgroundStyle = { background };
  return (
    <div className="post-item" style={backgroundStyle}>
      <div className="content-container">
        <Link to={data.path}>
          <h1 dangerouslySetInnerHTML={{ __html: data.title }} />
        </Link>
        <h5>{moment(data.date).fromNow()}</h5>
      </div>
    </div>
  );
};

export default Post;
