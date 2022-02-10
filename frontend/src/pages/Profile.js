import React, { Fragment, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
import { AuthContext } from "../context/AuthContext";
import Home from "../pages/Home";

function Profile() {
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  if (!user) {
    window.location = "/";
  }

  return (
    <Fragment>
      <Navbar />
      <a
        className="profile-icon"
        title="Retour"
        href={Home}
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
