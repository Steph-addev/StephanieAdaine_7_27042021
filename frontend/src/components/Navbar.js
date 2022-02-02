import React from "react";
import logo from "../assets/icon-left-font-monochrome-black.svg";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {
  let navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
        <div className="col-11">
          <img className="navbar-brand" src={logo} alt="logo"></img>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse col-1" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className="nav-item nav-link active"
              onClick={() => {
                navigate("/profil/");
              }}
            >
              <FaUserAlt title="Mon profil" />
            </a>
            <Logout />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
