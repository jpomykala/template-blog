const path = require('path');
const _ = require('lodash');

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;

  const postPageTemplate = path.resolve(`src/templates/post-page.js`);
  const tagTemplate = path.resolve("src/templates/tags.js");
  const categoryTemplate = path.resolve("src/templates/categories.js");

  // language=GraphQL
  return graphql(`
      {
          allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date] }
              filter: { frontmatter: { date: { ne: null } } }
              limit: 1000
          ) {
              edges {
                  node {
                      html
                      frontmatter {
                          date(formatString: "YYYY-MM-DD")
                          path
                          title
                          category
                          tags
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

    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach(({node}) => {
      createPage({
        path: node.frontmatter.path,
        node: node,
        component: postPageTemplate,
        context: {},
      });
    });

    let categories = [];
    _.each(posts, edge => {
      const postCategory = _.get(edge, "node.frontmatter.category");
      if (postCategory) {
        categories = categories.concat(postCategory)
      }
    });
    categories = _.uniq(categories);

    // Make tag pages
    categories.forEach(category => {
      createPage({
        path: `/category/${_.kebabCase(category)}`,
        component: categoryTemplate,
        context: {
          category
        },
      })
    });


    // Tag pages:
    let tags = [];
    _.each(posts, edge => {
      const postTags = _.get(edge, "node.frontmatter.tags");
      if (postTags) {
        tags = tags.concat(postTags)
      }
    });
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}`,
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })
  });
};
