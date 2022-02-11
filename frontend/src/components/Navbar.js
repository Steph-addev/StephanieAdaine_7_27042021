import React from "react";
import logo from "../assets/icon-left-font-monochrome-black.svg";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger d-flex">
        <div className="col-11">
          <img className="navbar-brand" src={logo} alt="logo"></img>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse col-1" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/profil" className="nav-item nav-link active">
              <FaUserAlt title="Mon profil" />
            </Link>
            <Logout />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
