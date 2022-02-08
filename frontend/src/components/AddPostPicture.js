import React, { Fragment, useContext, useEffect, useState } from "react";
import profileImg from "../assets/icon.svg";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";

function AddPostPicture() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  const PF = process.env.REACT_APP_PICTURES_URL;

  useEffect(() => {
    axios
      .get(`/users/${user.userId}`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((userApi) => {
        setUserData(userApi.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <img src={userData.profileImage ? userData.profileImage : PF + "profile-picture.png"} className="addPost-image_profile" alt="Profile picture"></img>
    </Fragment>
  );
}

export default AddPostPicture;
