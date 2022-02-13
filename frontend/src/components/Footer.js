import React, { Fragment } from "react";
import footerLogo from "../assets/icon-left-font-monochrome-white.svg";
import MediaQuery from "react-responsive";

const Footer = () => (
  <React.Fragment>
    <MediaQuery maxWidth={425}>
      <div className="footer d-flex flex-column">
        <img src={footerLogo} alt="logo"></img>
        <a href="mailto:groupomania@support.org">Contacter le support</a>
      </div>
    </MediaQuery>
    <MediaQuery minWidth={426}>
      <div className="footer d-flex flex-row justify-content-beetwen">
        <img src={footerLogo} alt="logo"></img>
        <a href="mailto:groupomania@support.org">Contacter le support</a>
      </div>
    </MediaQuery>
  </React.Fragment>
);

export default Footer;
