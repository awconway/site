import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faChevronDown,
  faGraduationCap,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ScrollingColorBackground from "../components/ScrollingColorBackground";
import SocialLink from "../components/SocialLink";
import ProjectViewer from "../components/ProjectViewer";
import ProjectViewerDesktop from "../components/ProjectViewerDesktop"
import Img from "gatsby-image";

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
          style={{ height: "100vh" }}
        >
          <div styleName="header">
            <div styleName="fade-top">
              <Img fixed={data.profilepic.childImageSharp.fixed} />
              <h1 styleName="title">aaron conway</h1>
              <p styleName="description">
                RBC Chair in Cardiovascular Nursing Research
            </p>
            </div>
            <div styleName="social-links fade-bottom">
              <SocialLink
                name="Email"
                icon={faEnvelope}
                href="mailto:aaron.conway@utoronto.ca"
              />
              <SocialLink
                name="Twitter"
                icon={faTwitter}
                href="https://twitter.com/aw_conway"
              />
              <SocialLink
                name="GoogleScholar"
                icon={faGraduationCap}
                href="https://scholar.google.ca/citations?user=2hpmnr8AAAAJ&hl"
              />
              <SocialLink
                name="LinkedIn"
                icon={faLinkedin}
                href="https://www.linkedin.com/in/aaron-conway-toronto/"
              />
              <SocialLink
                name="CV"
                icon={faFile}
                href="https://conwaycv.netlify.app"
              />
            </div>
            <FontAwesomeIcon styleName="chevron" icon={faChevronDown} />
          </div>
        </div>
        {projects.map(({ node }) => (
          mobile ? (
            <ProjectViewer key={node.id} project={node} />
          ) : (
              <ProjectViewerDesktop key={node.id} project={node} />
            )
        ))}
      </div>
      <footer styleName="header">
        <div styleName="fade-top">
          <h1 styleName="title">aaron conway</h1>
          <p styleName="description">
            RBC Chair in Cardiovascular Nursing Research
            </p>
        </div>
        <div styleName="social-links fade-bottom">
          <SocialLink
            name="Email"
            icon={faEnvelope}
            href="mailto:aaron.conway@utoronto.ca"
          />
          <SocialLink
            name="Twitter"
            icon={faTwitter}
            href="https://twitter.com/aw_conway"
          />
          <SocialLink
            name="GoogleScholar"
            icon={faGraduationCap}
            href="https://scholar.google.ca/citations?user=2hpmnr8AAAAJ&hl"
          />
          <SocialLink
            name="LinkedIn"
            icon={faLinkedin}
            href="https://www.linkedin.com/in/aaron-conway-toronto/"
          />
          <SocialLink
            name="CV"
            icon={faFile}
            href="https://conwaycv.netlify.app"
          />
        </div>
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
    profilepic: file(relativePath: { eq: "circle-cropped.png" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
