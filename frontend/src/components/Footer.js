import React from "react";
import footerLogo from "../assets/icon-left-font-monochrome-white.svg";
import MediaQuery from "react-responsive";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <React.Fragment>
    <MediaQuery maxWidth={425}>
      <div className="footer d-flex flex-column justify-content-center align-items-center m-0">
        <img src={footerLogo} alt="logo" className="p-2"></img>
        <a href="mailto:groupomania@support.org" className="p-2">
          <FaEnvelope /> Contacter le support
        </a>
      </div>
    </MediaQuery>
    <MediaQuery minWidth={426}>
      <div className="footer d-flex justify-content-evenly m-0">
        <img src={footerLogo} alt="logo"></img>
        <a href="mailto:groupomania@support.org">Contacter le support</a>
      </div>
    </MediaQuery>
  </React.Fragment>
);

export default Footer;
