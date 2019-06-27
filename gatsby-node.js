const path = require('path');
const _ = require('lodash');
const {createFilePath} = require('gatsby-source-filesystem');


exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;

  const postPageTemplate = path.resolve(`src/templates/blog-post-template.js`);
  const tagTemplate = path.resolve("src/templates/blog-tag-template.js");

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
                      fields {
                          slug
                      }
                      html
                      frontmatter {
                          date(formatString: "YYYY-MM-DD")
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
      console.log(result.errors);
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach(({node}) => {

      const relevantPosts = findRelevantPosts(node, posts);

      createPage({
        path: node.fields.slug,
        node: node,
        component: postPageTemplate,
        context: {
          slug: node.fields.slug,
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
          slug: `/tags/${_.kebabCase(tag)}`,
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

  const currentNodePath = node.frontmatter.title;
  relevantPosts = _.uniq(relevantPosts);
  relevantPosts = relevantPosts
    .filter(({node}) => withSamePath(node, currentNodePath));
  return relevantPosts;
}

function withTag(node, tag) {
  return node.frontmatter.tags.includes(tag);
}

function withSamePath(node, currentPath) {
  return node.frontmatter.title !== currentPath;
}
