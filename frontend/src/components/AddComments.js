import axios from "axios";
import React, { useState } from "react";

import AddPostPicture from "./AddPostPicture";
import { FaPaperPlane } from "react-icons/fa";

function AddComments({ postDataId, userDataId }) {
  const [text, setText] = useState("");

  const addOneComment = (e) => {
    e.preventDefault();
    axios({
      method: "patch",
      url: `http://localhost:5000/posts/comment-add/${postDataId}`,
      credentials: true,
      data: {
        UserId: userDataId,
        PostId: postDataId,
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
    <div className="newpost-comments d-flex mt-3">
      <form className="newpost-comments_form d-flex mt-3" onSubmit={addOneComment}>
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
