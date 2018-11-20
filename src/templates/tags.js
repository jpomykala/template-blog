import React from "react"
// Components
import {graphql} from "gatsby"
import Layout from "../components/Layout";
import Header from "../components/Header";
import PageContainer from "../components/PageContainer";
import PostItemList from "../components/PostItemList";
import HomeLink from "../components/HomeLink";

const Tags = ({pageContext, data}) => {
  const {tag} = pageContext;
  const {edges} = data.allMarkdownRemark;

  return (
    <Layout>
      <Header/>
      <PageContainer>
        <div className="mt-4">
          <HomeLink/>
        </div>
        <h1 className="page__header">
          <i className="fal fa-tag"/>{' '} {tag}
        </h1>

        <PostItemList
          items={edges}
        />
      </PageContainer>
    </Layout>
  )
};

export default Tags;


export const pageQuery = graphql`
    query($tag: String) {
        allMarkdownRemark(
            limit: 2000
            sort: {fields: [frontmatter___date], order: DESC}
            filter: {frontmatter: {tags: {in: [$tag]}}}
        ) {
            totalCount
            edges {
                node {
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        path
                        excerpt
                    }
                }
            }
        }
    }
`;
