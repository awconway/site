import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
// import { isIOS } from "react-device-detect";
// import vhCheck from "vh-check";

// This ensures that the icon CSS is loaded immediately before attempting to render icons
// See https://github.com/FortAwesome/react-fontawesome/issues/134
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import "./Layout.css";

// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false;

const Layout = ({ children }) => {


  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => {
        return (
          <>
              <main>{children}</main>
          </>
        );
      }}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
