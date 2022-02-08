import React, { useContext, useState } from "react";
import { FaImage } from "react-icons/fa";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Avatar } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
/* import useFetch from "../hooks/useFetch";
 */
function AddPost({ users }) {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState(null);
  /*   const { refetch } = useFetch("/posts"); */
  const PF = process.env.REACT_APP_PICTURES_URL;

  const addPicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setText("");
    setPostPicture("");
    setFile("");
  };

  const addOnePost = (e) => {
    e.preventDefault();

    let myform = e.target;
    let data = new FormData(myform);
    if (file) {
      data.append("UserId", user.userId);
      data.append("content", text);
      data.append("image", "image");
    } else {
      data.append("UserId", user.userId);
      data.append("content", text);
    }

    axios({
      method: "post",
      url: "/posts",
      credentials: true,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
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

  return (
    <div className="addPost-box container-fluid d-flex justify-content-center">
      <div className="d-flex">
        <Avatar
          src={users
            .map((userData) => {
              if (userData.id === user.userId) return userData.profileImage ? userData.profileImage : PF + "profile-picture.png";
              else return null;
            })
            .join("")}
          className="addPost-image_profile"
          alt={"photo de profil"}
        ></Avatar>
        <p>Exprimez-vous</p>
      </div>
      <form onSubmit={addOnePost} id="addPost-box_form container">
        <div className="row">
          <TextareaAutosize aria-label="minimum height" type="text" minRows={3} placeholder="Quoi de neuf?" className="my-3 addPost-box_publish--content" style={{ width: 200 }} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="row">{postPicture ? <img src={postPicture} alt="" className="addPost-box_publish--image" /> : null}</div>
        <div className="row">
          <label htmlFor="file" className="d-flex justify-content-around addPost-box_publish--imageBtn">
            <FaImage />
            <input type="file" className="button-style button-style_image" name="image" accept=".jpg, .png, .gif" onChange={(e) => addPicture(e)}></input>
            {postPicture ? (
              <button className="cancel" onClick={cancelPost}>
                Annuler message
              </button>
            ) : null}
            <input type="submit" className="button-style button-style_publish" defaultValue="Publier"></input>
          </label>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
