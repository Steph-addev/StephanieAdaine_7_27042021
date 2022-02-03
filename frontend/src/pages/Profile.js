import React, { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
import Home from "../pages/Home";

function Profile() {
  let navigate = useNavigate();

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
        <FaArrowLeft />
      </a>
      <ProfileForm />
    </Fragment>
  );
}

export default Profile;
