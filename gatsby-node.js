const path = require('path');
const _ = require('lodash');

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;

  const postPageTemplate = path.resolve(`src/templates/post.js`);
  const tagTemplate = path.resolve("src/templates/tags.js");

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
                          excerpt
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

      const relevantPosts = findRelevantPosts(node, posts);

      createPage({
        path: node.frontmatter.path,
        node: node,
        component: postPageTemplate,
        context: {
          relevantPosts
        },
      });
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

function findRelevantPosts(node, posts) {
  let relevantPosts = [];
  let tags = _.get(node, "frontmatter.tags", []);
  tags.forEach(tag => {
    const tagPosts = posts.filter(({node}) => withTag(node, tag));
    relevantPosts = relevantPosts.concat(tagPosts);
  });

  const currentNodePath = node.frontmatter.path;
  relevantPosts = _.uniq(relevantPosts);
  relevantPosts = relevantPosts
    .filter(({node}) => withSamePath(node, currentNodePath))
    .filter(withDate);
  return relevantPosts;
}

function withDate(node) {
  return true;
}

function withTag(node, tag) {
  return node.frontmatter.tags.includes(tag);
}

function withSamePath(node, currentPath) {
  return node.frontmatter.path !== currentPath;
}
