import React from "react"
// Components
import {graphql, Link} from "gatsby"
import Layout from "../components/Layout";
import Header from "../components/Header";
import PostItem from "../components/PostItem";
import PageContainer from "../components/PageContainer";

const Tags = ({pageContext, data}) => {
  const {tag} = pageContext;
  const {edges} = data.allMarkdownRemark;

  return (
    <Layout>
      <Header/>
      <PageContainer>
        <h1 className="page__header">
          {`Blog posts tagged with "${tag}"`}
        </h1>
        <div className="text-center mb-5">
          <span className="mx-5"><Link to="/tags">All tags</Link></span>
          <span className="mx-5"><Link to="/">All posts</Link></span>
        </div>


        {edges.map(({node}) => {
          const {path} = node.frontmatter;
          return (
            <PostItem key={path} post={node.frontmatter}/>
          )
        })}
      </PageContainer>
    </Layout>
  )
};

export default Tags;


export const pageQuery = graphql`
    query($tag: String) {
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
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
