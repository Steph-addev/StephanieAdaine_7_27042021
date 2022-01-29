import React, { Fragment, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
import Home from "../pages/Home";
import axios from "axios";

function Profile() {
  let navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users`)
      .then((userId) => {
        setUser(userId.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      <ProfileForm profile={user} />
    </Fragment>
  );
}

export default Profile;
