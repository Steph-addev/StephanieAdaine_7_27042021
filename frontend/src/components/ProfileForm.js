import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../useFetch";

function ProfileForm() {
  let navigate = useNavigate();
  const [profileName, setProfileName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileUser, setProfileUser] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const { user } = useContext(AuthContext);
  const { refetch } = useFetch(`http://localhost:5000/users/${user.userId}`);

  const PF = process.env.REACT_APP_PICTURES_URL;

  const updatedData = {
    id: user.userId,
    username: profileName,
    profileDesc: profileBio,
  };

  const updateProfilePicture = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
    let myform = e.target;
    let data = new FormData(myform);
    data.append("image", "image");

    axios({
      method: "post",
      url: `http://localhost:5000/users/${profileUser.id}/upload`,
      credentials: true,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: data,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (e) => {
    axios
      .delete(`http://localhost:5000/users/${user.userId}`)
      .then(() => {
        window.confirm("Êtes-vous sûr de vouloir supprimer votre compte? Votre compte sera définitivement supprimé de notre base de donnée");
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = () => {
    if (profileName || profileBio) {
      axios
        .put(`http://localhost:5000/users/${user.userId}`, updatedData)
        .then((res) => {
          console.log(res);
          console.log("L'utilisateur a été modifé");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${user.userId}`)
      .then((user) => {
        setProfileUser(user.data);
        console.log(user.data);
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
            <form onSubmit={updateProfilePicture} id="form" className="profileForm-box_image d-flex">
              <img src={profileUser.profileImage ? profileUser.profileImage : PF + "profile-picture.png"} alt="photo de profil" className="profileForm-box_image--picture"></img>
              <input type="file" className="profileForm-box_image--input" name="image"></input>
              <button type="submit" className="profileForm-box_image--button"></button>
              <label className="profileForm-box_image--label" htmlFor="file">
                Changer sa photo de profil
              </label>
            </form>
          </div>
        </div>
        <div className="Profile container">
          <div className="Profile-box row ">
            <div className="Profile-box_user--fixed col-6">
              <div className="Profile-box_user--data d-flex">
                <label>Email:</label>
                <p>{profileUser.email}</p>
              </div>
              <div className="Profile-box_user--data d-flex">
                <label>Département:</label>
                <p>{profileUser.department}</p>
              </div>
              <div className="Profile-box_user--data d-flex">
                <label>Site de travail:</label>
                <p>{profileUser.workplace}</p>
              </div>
            </div>
            <div className="Profile-box_user--changeable col-6">
              <div className="Profile-box_user--dataChange d-flex">
                <label>Nom de profil:</label>
                {isUpdated === false && <p>{profileUser.username}</p>}
                {isUpdated && (
                  <div className="profile-box_update">
                    <input defaultValue={profileUser.username} onChange={(e) => setProfileName(e.target.value)} />
                  </div>
                )}
              </div>
              <div className="Profile-box_user--dataChange d-flex">
                <label>Bio:</label>
                {isUpdated === false && <p>{profileUser.profileDesc}</p>}
                {isUpdated && (
                  <div className="profile-box_update">
                    <textarea defaultValue={profileUser.profileDesc} onChange={(e) => setProfileBio(e.target.value)} />
                  </div>
                )}
              </div>
            </div>
            <div className="Profile-box_user--dataChange_btn d-flex justify-content-center">
              <button type="submit" onClick={deleteUser}>
                Supprimer mon compte
              </button>
              <button type="submit" onClick={updateUser}>
                Enregistrer les modifications
              </button>
              <button type="submit" onClick={() => setIsUpdated(!isUpdated)}>
                Modifier mon profil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
