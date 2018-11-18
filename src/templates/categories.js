import React from "react"
// Components
import {graphql, Link} from "gatsby"
import Layout from "../components/Layout";
import Header from "../components/Header";

const Tags = ({pageContext, data}) => {
  const {category} = pageContext;
  const {edges, totalCount} = data.allMarkdownRemark;
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
    } in category "${category}"`;

  return (
    <Layout>
      <Header/>
      <div className="container">
        <h1 className="text-center">
          {categoryHeader}
        </h1>
        <ul>
          {edges.map(({node}) => {
            const {path, title} = node.frontmatter;
            return (
              <li key={path}>
                <Link to={path}>{title}</Link>
              </li>
            )
          })}
        </ul>
        <Link to="/categories">All categories</Link>
      </div>
    </Layout>
  )
};

export default Tags;


export const pageQuery = graphql`
    query($category: String) {
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { category: { in: [$category] } } }
        ) {
            totalCount
            edges {
                node {
                    frontmatter {
                        title
                        path
                    }
                }
            }
        }
    }
`;
