import React from "react"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import Helmet from "react-helmet"
import {graphql, Link} from "gatsby"
import Header from "../components/Header";
import Layout from "../components/Layout";
import PageContainer from "../components/PageContainer";

const TagsPage = ({
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
      <h1 className="page__header">
        Blog post tags
      </h1>
      <ul>
        {group
          .sort((lhs, rhs) => rhs.totalCount - lhs.totalCount)
          .map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
      </ul>
    </PageContainer>
  </Layout>
);

export default TagsPage;

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
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;
