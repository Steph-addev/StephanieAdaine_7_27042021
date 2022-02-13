// Import mandatories to run the app
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// Import Components
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
//Import front visuals
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../components/Footer";

function Profile() {
  const userId = localStorage.getItem("user");

  if (!userId) {
    window.location = "/";
  }

  window.onunload = () => {
    // Clear the local storage on close page
    window.Storage.clear();
  };

  return (
    <Fragment>
      <Navbar />
      <div className="profile-page container-fluid p-0 m-auto">
        <Link to="/accueil" className="profile-icon d-flex align-items-baseline" title="Retour">
          <FaArrowLeft className="svg-arrow" aria-label="arrow-back" /> Retour
        </Link>
        <ProfileForm />
      </div>
      <Footer />
    </Fragment>
  );
}

export default Profile;
