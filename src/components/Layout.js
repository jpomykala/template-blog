import React from 'react';
import Helmet from 'react-helmet';
import {graphql, StaticQuery} from 'gatsby';

const title = "jpomykala blog";
const description = "Personal blog by Jakub Pomykała. I explain with words and code.";

const Layout = ({children}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {name: 'description', content: description},
          ]}
        >
          <html lang="en"/>

          <meta data-react-helmet="true" property="og:url" content="https://jpomykala.com"/>
          <meta data-react-helmet="true" property="og:title" content={title}/>
          <meta data-react-helmet="true" name="og:description" content={description}/>
          <meta data-react-helmet="true" name="twitter:card" content="summary"/>
          <meta data-react-helmet="true" name="twitter:creator" content="@jakub_pomykala"/>
          <meta data-react-helmet="true" name="twitter:title" content={title}/>
          <meta data-react-helmet="true" name="twitter:description" content={description}/>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          />
          <script
            async
            src="https://buttons.github.io/buttons.js"/>
        </Helmet>
        {children}
      </>
    )}
  />
);

export default Layout;
