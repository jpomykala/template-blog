import React from 'react';
import Helmet from 'react-helmet';
import {graphql, StaticQuery} from 'gatsby';

const Layout = ({ children }) => (
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
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
          <script
            src="https://platform.twitter.com/widgets.js"
            async
            charSet="utf-8"
          />
          <script src="https://buttons.github.io/buttons.js" async/>
        </Helmet>
        {children}
      </>
    )}
  />
);

export default Layout;
