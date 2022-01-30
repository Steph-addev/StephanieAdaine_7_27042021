import React, { useContext, useState } from "react";
import { FaImage } from "react-icons/fa";
import profileImg from "../assets/icon.svg";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function AddPost({ userImage }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const { user } = useContext(AuthContext);

  const addOnePost = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/posts",
      credentials: true,
      data: {
        UserId: user.id,
        title: title,
        content: text,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="addPost d-flex justify-content-center">
        <div className="addPost-publish px-4 py-4">
          <div className="d-flex ">
            <img src={userImage.profileImage} className="addPost-image_profile" alt="test"></img>
            <p>Exprimez-vous</p>
          </div>
          <form onSubmit={addOnePost}>
            <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <textarea type="text" placeholder="Votre message ici" className="my-3" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <div className="d-flex justify-content-around">
              <button className="button-style button-style_image">
                <FaImage />
              </button>
              <button type="submit" className="button-style button-style_publish">
                Publier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
