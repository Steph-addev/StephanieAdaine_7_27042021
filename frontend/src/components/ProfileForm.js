import React, { useState, useEffect, Fragment } from "react";
import axios from "../api/axios";
import { FaCamera } from "react-icons/fa";
import TextareaAutosize from "@mui/base/TextareaAutosize";

function ProfileForm() {
  const [profileBio, setProfileBio] = useState("");
  const [profileUser, setProfileUser] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const userId = localStorage.getItem("user");

  const PF = process.env.REACT_APP_PICTURES_URL;

  const updatedData = {
    id: userId,
    profileDesc: profileBio,
  };

  const updateProfilePicture = (e) => {
    e.preventDefault();
    let myform = e.target;
    let data = new FormData(myform);
    data.append("UserId", userId);
    data.append("image", "image");

    axios({
      method: "post",
      url: `/users/${userId}/upload`,
      credentials: true,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },
      data: data,
    })
      .then((response) => {
        window.location.reload();
        setIsUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (e) => {
    if (e.target) {
      window.confirm("Êtes-vous sûr de vouloir supprimer votre compte? Votre compte sera définitivement supprimé de notre base de donnée");
      if ("ok") {
        axios
          .delete(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("token"),
            },
          })
          .then(() => {
            localStorage.clear();
            window.location = "/";
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return false;
      }
    }
  };

  const updateUser = () => {
    if (profileBio) {
      axios
        .put(`/users/${userId}`, updatedData, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          window.location.reload();
          console.log("L'utilisateur a été modifé");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((user) => {
        setProfileUser(user.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <Fragment>
      <div className="profileForm container p-0">
        <h1 className="profileForm-title row justify-content-center p-4 mb-0 text-center">Profil de {profileUser.username}</h1>
        <div className="profileForm-box row m-5">
          <form onSubmit={updateProfilePicture} id="form" className="container m-auto">
            <div className="row profileForm-box_image justify-content-center">
              <div className="col-sm-4">
                <img src={profileUser.profileImage ? profileUser.profileImage : PF + "profile-picture.png"} alt={profileUser.username} className="profileForm-box_image--picture row rounded mx-auto d-block"></img>
                <label className="profileForm-box_image--label row justify-content-center" htmlFor="camera">
                  <FaCamera className="profileForm-box_icon " />
                  <input style={{ display: "none" }} type="file" id="camera" className="profileForm-box_image--input" name="image" display="none"></input>
                </label>
              </div>
              <div className="col-sm-4 d-flex align-items-center justify-content-center">
                <button type="submit" className="profileForm-box_image--button btn btn-danger">
                  Valider ma photo
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="profile-box row container card bg-light mb-3 text-center m-auto">
          <div className="card-header row m-auto mb-3">
            <h2>Mes données</h2>
          </div>
          <div className="profile-box_user--fixed card-body row m-auto">
            <div className="profile-box_user--data d-flex">
              <label className="label p-2 fw-bold">Nom:</label>
              <p className="data p-2 mb-0">{profileUser.username}</p>
            </div>
            <div className="profile-box_user--data d-flex">
              <label className="label p-2 fw-bold">Email:</label>
              <p className="data p-2 mb-0">{profileUser.email}</p>
            </div>
            <div className="profile-box_user--data d-flex">
              <label className="label p-2 fw-bold">Département:</label>
              <p className="data p-2 mb-0">{profileUser.department}</p>
            </div>
            <div className="profile-box_user--data d-flex">
              <label className="label p-2 mb-0 fw-bold">Site de travail:</label>
              <p className="data p-2">{profileUser.workplace}</p>
            </div>
          </div>
          <div className="profile-box_user--changeable card-body row m-auto">
            <div className="profile-box_user--dataChange-textarea my-2 col-sm-6">
              <label className="label fw-bold">Bio:</label>
              {isUpdated === false && <p>{profileUser.profileDesc}</p>}
              {isUpdated && (
                <div className="profile-box_update">
                  <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" style={{ borderRadius: 20, padding: 10 }} defaultValue={profileUser.profileDesc} onChange={(e) => setProfileBio(e.target.value)} />
                </div>
              )}
            </div>
            <button className="btn btn-danger col-sm-4 my-2" type="submit" onClick={() => setIsUpdated(!isUpdated)}>
              Modifier ma Bio
            </button>
          </div>
          <div className="profile-box_user--dataChange_btn m-auto row">
            <button className="btn btn-danger btn-account my-2 col-sm-5" type="submit" onClick={deleteUser}>
              Supprimer mon compte
            </button>
            <button className="btn btn-danger btn-account my-2 col-sm-5" type="submit" onClick={updateUser}>
              Valider les modifications
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProfileForm;
