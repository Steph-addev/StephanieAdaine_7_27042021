import React, { useContext, useState } from "react";
import { FaImage } from "react-icons/fa";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import AddPostPicture from "./AddPostPicture";
import useFetch from "../hooks/useFetch";

function AddPost() {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState(null);
  const { refetch } = useFetch("/posts");

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
    <div className="addPost">
      <div className="addPost-box d-flex justify-content-center">
        <div className="addPost-box_publish px-4 py-4">
          <div className="d-flex ">
            <AddPostPicture />
            <p>Exprimez-vous</p>
          </div>
          <form onSubmit={addOnePost} id="addPost-box_form">
            <div className="row">
              <textarea className="addPost-box_publish--content" type="text" placeholder="Votre message ici" className="my-3" value={text} onChange={(e) => setText(e.target.value)}></textarea>
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
      </div>
    </div>
  );
}

export default AddPost;
