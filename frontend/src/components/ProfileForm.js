import React, { useState } from "react";
import axios from "axios";
import ProfilePicture from "./ProfilePicture";

function ProfileForm() {
  const [profileName, setprofileName] = useState("");
  const [profilePassword, setprofilePassword] = useState("");
  const [profileEmail, setprofileEmail] = useState("");
  const [profileBio, setprofileBio] = useState("");
  const [profileDepartment, setprofileDepartment] = useState("");
  const [profileSite, setprofileSite] = useState("");

  const setProfile = (event) => {
    event.preventDefault();
    /*     const recupUrl = window.location.search;
    const recupId = new URLSearchParams(recupUrl);
    const userId = recupId.get("uuid"); */
    axios
      .get("/users/e684e7bc-5138-48b9-896f-6e4feeb1622f")
      .then(function (response) {
        // handle success
        console.log(response);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <div>
      <div className="profileForm">
        <h1>Mon profil</h1>
        <div>
          <ProfilePicture />
        </div>
        <form className="profileForm-box" onSubmit={setProfile}>
          <div>
            <label>Nom de profil:</label>
            <input id="profileName" value={profileName} onChange={(e) => setprofileName(e.target.value)}></input>
          </div>
          <div>
            <label>Email:</label>
            <input id="profileEmail" value={profileEmail} onChange={(e) => setprofileEmail(e.target.value)}></input>
          </div>
          <div>
            <label>Mot de passe:</label>
            <input id="profilePassword" value={profilePassword} onChange={(e) => setprofilePassword(e.target.value)}></input>
          </div>
          <div>
            <label>Bio:</label>
            <textarea id="profileBio" value={profileBio} onChange={(e) => setprofileBio(e.target.value)}></textarea>
          </div>
          <div>
            <label>Département:</label>
            <input id="profileDepartment" value={profileDepartment} onChange={(e) => setprofileDepartment(e.target.value)}></input>
          </div>
          <div>
            <label>Site de travail:</label>
            <input id="profileSite" value={profileSite} onChange={(e) => setprofileSite(e.target.value)}></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
