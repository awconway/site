import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import SocialLink from "../components/SocialLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faChevronDown,
  faGraduationCap,
  faFileUser,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

import Img from "gatsby-image";

import "./header.module.css";

import { Fade } from "react-reveal";

export default function Header() {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      profilepic: file(relativePath: { eq: "circle-cropped.png" }) {
        childImageSharp {
          fixed(width: 125, height: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
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
          icon={faFileUser}
          href="https://conwaycv.gatsbyjs.io"
        />
      </div>
      <div styleName="scroll">
        <Fade ssrReveal delay={1500}>
          <div>Scroll down</div>
          <FontAwesomeIcon icon={faChevronDown} />
        </Fade>
      </div>
    </div>
  );
}
