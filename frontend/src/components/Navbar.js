import React from "react";
import logo from "../assets/icon-left-font-monochrome-black.svg";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

function Navbar() {
  let navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
        <div className="col-10">
          <img className="navbar-brand" src={logo} alt="logo"></img>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse col-2" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className="nav-item nav-link active"
              href={Login}
              onClick={() => {
                navigate("/");
              }}
            >
              Mon profil
            </a>
            <a
              className="nav-item nav-link"
              href={Profile}
              onClick={() => {
                navigate("/profil");
              }}
            >
              Se déconnecter
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
