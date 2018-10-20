const path = require('path');

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;

  const postPage = path.resolve(`src/pages/post-page.js`);
  // language=GraphQL
  return graphql(`
      {
          allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date] }
              limit: 1000
          ) {
              edges {
                  node {
                      html
                      frontmatter {
                          date(formatString: "YYYY-MM-DD")
                          path
                          title
                          categories
                          image {
                              publicURL
                              childImageSharp {
                                  sizes(maxWidth: 1240) {
                                      srcSet
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges
      .forEach(({node}) => {
        createPage({
          path: node.frontmatter.path,
          node: node,
          component: postPage,
          context: {},
        });
      });
  });
};
