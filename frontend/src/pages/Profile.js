import React, { Fragment, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
import Home from "../pages/Home";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
      <ProfileForm value={user} />
    </Fragment>
  );
}

export default Profile;
