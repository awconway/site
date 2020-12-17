import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ScrollingColorBackground from "../components/ScrollingColorBackground";
import ProjectViewer from "../components/ProjectViewer";
import ProjectViewerDesktop from "../components/ProjectViewerDesktop"

import Header from "../components/header"

import "./index.module.css";

import { isMobile } from "react-device-detect";

const IndexPage = ({ data }) => {

  const [mobile, setMobile] = useState()

  useEffect(() => {
    setMobile(isMobile)
  }, [setMobile])

  const projects = data.allProjectsYaml.edges;

  return (
    <Layout>
      <SEO
        keywords={[
          `Aaron Conway`,
          `nursing research`,
          `research`,
          `nursing`,
          `sedation`,
          `procedural sedation and analgesia`,
          `procedural sedation`,
          `conscious sedation`,
          `anesthesia`,
          `temperature`,
          `capnography`,
        ]}
      />
      <div
        style={{
          position: "relative",
        }}
      >
        <ScrollingColorBackground
          selector=".js-color-stop[data-background-color]"
          colorDataAttribute="data-background-color"
        />
        <div
          className="js-color-stop"
          data-background-color={"white"}
          styleName="wrapper"
        >
          <Header />
        </div>
        {projects.map(({ node }) => (
          mobile ? (
            <ProjectViewer key={node.id} project={node} />
          ) : (
              <ProjectViewerDesktop key={node.id} project={node} />
            )
        ))}
      </div>
      <footer >
        <Header />
      </footer>
    </Layout>
  );
};

export default IndexPage;

export const IndexQuery = graphql`
  query {
    allProjectsYaml {
      edges {
        node {
          id
          name
          color
          icon {
            childImageSharp {
              # Hint the best image size to use
              # default assumes 100vw which is wrong for us and ends up loading a version that's too big/heavy
              fluid(sizes: "16vh", maxWidth: 256) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          prerenderedIcon
          description
          keywords
          screenshots {
            link
            image {
              id
              childImageSharp {
                fixed(width: 250, height: 322) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          screenshots {
            link
            image {
              id
              childImageSharp {
                fluid(toFormat: JPG, quality: 80) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
        }
      }
    }
  }
`;
