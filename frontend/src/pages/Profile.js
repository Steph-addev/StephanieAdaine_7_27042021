// Import mandatories to run the app
import React, { Fragment } from "react";
// Import Components
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
//Import front visuals
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userId = localStorage.getItem("user");
  let navigate = useNavigate();

  if (!userId) {
    window.location = "/";
  }

  return (
    <Fragment>
      <Navbar />
      <a
        className="profile-icon"
        title="Retour"
        href="#"
        onClick={() => {
          navigate("/accueil");
        }}
      >
        <FaArrowLeft className="svg-arrow" />
      </a>
      <ProfileForm />
    </Fragment>
  );
}

export default Profile;
