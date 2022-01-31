import React, { Fragment, useContext, useEffect, useState } from "react";
import profileImg from "../assets/icon.svg";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function AddPostPicture() {
  const { user } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${user.userId}`)
      .then((userApi) => {
        setDataUser(userApi.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <img src={dataUser.profileImage} className="addPost-image_profile" alt="Profile picture"></img>
    </Fragment>
  );
}

export default AddPostPicture;
