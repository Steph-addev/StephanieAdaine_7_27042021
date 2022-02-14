// Import mandatories to succeed
import React, { Fragment, useState } from "react";
import axios from "../api/axios";
//Import front materials
import { FaImage } from "react-icons/fa";
import { Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";

// Component to add a new Post in the database
function AddPost({ users }) {
  const [text, setText] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PICTURES_URL;
  const userId = localStorage.getItem("user");

  //If picture in the post, the picture will be previsualized on click on the input with the URL of the image and send if we are ok
  const addPicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  // The previsualization can be canceled on the button cancel if we want to change the image or remove it
  const cancelPost = () => {
    setText("");
    setPostPicture("");
    setFile("");
  };

  const addOnePost = (e) => {
    e.preventDefault();

    //Fonction to submit a form, we append required data for the database
    let myform = e.target;
    let data = new FormData(myform);
    if (file) {
      data.append("UserId", userId);
      data.append("content", text);
      data.append("image", "image");
      console.log("test avec");
    } else {
      data.append("UserId", userId);
      data.append("content", text);
      console.log("test sans image");
    }

    if (!text) {
      alert("Le texte de votre publication ne peut pas être vide");
    } else {
      //Axios to post our new publication in the database
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
          setText("");
          setPostPicture("");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Fragment>
      <div className="addPost-box card-post container-fluid justify-content-center mt-0">
        <div className="row pt-3 align-items">
          <Avatar
            src={users
              .map((userData) => {
                if (userData.id === parseInt(userId)) return userData.profileImage ? userData.profileImage : PF + "profile-picture.png";
                else return null;
              })
              .join("")}
            className="addPost-image_profile col-1"
            alt={"photo de profil"}
          ></Avatar>
          <div className="col-8">
            <h2 className="addPost-font_h2">Exprimez-vous</h2>
          </div>
        </div>
        <form onSubmit={addOnePost} id="addPost-box_form container row justify-content-center">
          <div className="row justify-content-center">
            <TextField id="standard-basic" multiline variant="standard" type="text" placeholder="Quoi de neuf?" className="my-3 addPost-box_publish--content" style={{ width: 300, backgroundColor: "#f2f2f2" }} value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className="row addPost-box_publish--image-box">{postPicture ? <img src={postPicture} alt="" className="addPost-box_publish--image row" /> : null}</div>
          <div className="row py-3">
            <div className="d-flex justify-content-around addPost-box_publish--imageBtn">
              <label htmlFor="file">
                <FaImage className="addPost-box_icon text-danger " />
                <input style={{ display: "none" }} type="file" id="file" className="button-style button-style_image" name="image" accept=".jpg, .png, .gif" onChange={(e) => addPicture(e)}></input>
              </label>
              {postPicture ? (
                <button className="cancel btn btn-warning" onClick={cancelPost}>
                  Annuler
                </button>
              ) : null}
              <input type="submit" className="button-style button-style_publish btn btn-danger" defaultValue="Publier"></input>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default AddPost;
