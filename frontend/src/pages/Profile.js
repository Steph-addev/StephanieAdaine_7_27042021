import React, { Fragment, useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
import Home from "../pages/Home";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);

  /*   useEffect(() => {
    axios
      .get(`http://localhost:5000/users`)
      .then((userId) => {
        setUser(userId.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); */

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
