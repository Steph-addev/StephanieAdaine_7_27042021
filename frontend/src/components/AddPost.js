import React, { useContext, useState } from "react";
import { FaImage } from "react-icons/fa";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AddPostPicture from "./AddPostPicture";

function AddPost() {
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
            <AddPostPicture />
            <p>Exprimez-vous</p>
          </div>
          <form onSubmit={addOnePost}>
            <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <textarea type="text" placeholder="Votre message ici" className="my-3" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <div className="d-flex justify-content-around">
              <input type="file" className="button-style button-style_image">
                {/*                 <FaImage /> */}
              </input>
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
