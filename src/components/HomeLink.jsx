import React from "react";
import {Link} from "gatsby";

const HomeLink = ({className}) => (
  <div className={`text-center ${className}`}
       style={{fontSize: '0.9rem'}}>
    <Link to="/">Home</Link>
  </div>
);

export default HomeLink;
