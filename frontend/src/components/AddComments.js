import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AddPostPicture from "./AddPostPicture";
import { FaPaperPlane } from "react-icons/fa";

function AddComments({ postId, userInfo }) {
  const [text, setText] = useState("");

  const addOneComment = (e) => {
    e.preventDefault();
    axios({
      method: "patch",
      url: `http://localhost:5000/posts/comment-add/${postId}`,
      credentials: true,
      data: {
        UserId: userInfo,
        PostId: postId,
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
      <form className="newpost-comments_form d-flex" onSubmit={addOneComment}>
        <AddPostPicture />
        <input type="text" className="newpost-comments_form--input" placeholder="Laisser un commentaire" value={text} onChange={(e) => setText(e.target.value)}></input>
        <button type="submit">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}

export default AddComments;
