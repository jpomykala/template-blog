import React from "react"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import Helmet from "react-helmet"
import {graphql, Link} from "gatsby"
import Header from "../components/Header";
import Layout from "../components/Layout";
import PageContainer from "../components/PageContainer";

const CategoriesPage = ({
                          data: {
                            allMarkdownRemark: {group},
                            site: {
                              siteMetadata: {title},
                            },
                          },
                        }) => (
  <Layout>
    <Helmet title={title}/>
    <Header/>
    <PageContainer>
      <h1 className="text-center">Categories</h1>
      <ul>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/category/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </PageContainer>
  </Layout>
);

export default CategoriesPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 2000
        ) {
            group(field: frontmatter___category) {
                fieldValue
                totalCount
            }
        }
    }
`;
