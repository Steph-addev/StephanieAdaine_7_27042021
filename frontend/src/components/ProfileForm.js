import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { AuthContext } from "../context/AuthContext";

function ProfileForm({ profile }) {
  let navigate = useNavigate();
  const [profileName, setprofileName] = useState("");
  const [profilePassword, setprofilePassword] = useState("");
  const [profileEmail, setprofileEmail] = useState("");
  const [profileBio, setprofileBio] = useState("");
  const [profileDepartment, setprofileDepartment] = useState("");
  const [profileSite, setprofileSite] = useState("");
  const [profileUser, setProfileUser] = useState({});
  const { user } = useContext(AuthContext);

  const setProfile = (event) => {
    event.preventDefault();
    /*     const recupUrl = window.location.search;
    const recupId = new URLSearchParams(recupUrl);
    const userId = recupId.get("uuid"); */
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${user.userId}`) // trouver le moyen de liéer l'id à la session
      .then((userId) => {
        setProfileUser(userId.data);
        console.log(userId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="profileForm">
        <h1>Profil de {profileUser.username}</h1>
        <div>
          <div>
            <form className="profileForm-box_image d-flex" method="post" action="http://localhost:5000/users/1/upload" encType="multipart/form-data" data={profileUser.username}>
              <img src={profileUser.profileImage} alt="" className="profileForm-box_image--picture"></img>
              <input type="file" className="profileForm-box_image--input" name="image"></input>
              <input
                type="submit"
                className="profileForm-box_image--button"
                onClick={() => {
                  navigate("/profil");
                }}
              ></input>
              <label className="profileForm-box_image--label" htmlFor="file">
                Changer sa photo de profil
              </label>
            </form>
          </div>
        </div>
        <form className="profileForm-box" onSubmit={setProfile}>
          <div>
            <label>Nom de profil:</label>
            <input placeholder={profileUser.username} id="profileName" value={profileName} onChange={(e) => setprofileName(e.target.value)}></input>
          </div>
          <div>
            <label>Email:</label>
            <input placeholder={profileUser.email} id="profileEmail" value={profileEmail} onChange={(e) => setprofileEmail(e.target.value)}></input>
          </div>
          <div>
            <label>Mot de passe:</label>
            <input type="password" id="profilePassword" value={profilePassword} onChange={(e) => setprofilePassword(e.target.value)}></input>
          </div>
          <div>
            <label>Bio:</label>
            <textarea placeholder={profileUser.profileDesc} id="profileBio" value={profileBio} onChange={(e) => setprofileBio(e.target.value)}></textarea>
          </div>
          <div>
            <label>Département:</label>
            <input placeholder={profileUser.department} id="profileDepartment" value={profileDepartment} onChange={(e) => setprofileDepartment(e.target.value)}></input>
          </div>
          <div>
            <label>Site de travail:</label>
            <input placeholder={profileUser.workplace} id="profileSite" value={profileSite} onChange={(e) => setprofileSite(e.target.value)}></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
