import axios from "../api/axios";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

function AddComments({ postData, userData }) {
  const [text, setText] = useState("");

  const addOneComment = (e) => {
    e.preventDefault();
    axios({
      method: "patch",
      url: `/posts/comment-add/${postData.id}`,
      credentials: true,
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },
      data: {
        UserId: userData.id,
        PostId: postData.id,
        content: text,
      },
    })
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="addComment mt-3">
      <form className="addComment_form d-flex mt-3" onSubmit={addOneComment}>
        {/*         <img src={userData.profileImage} className="addComment-image_profile" alt={userData.username}></img> */}
        <input type="text" className="addComment_form--input me-2 ps-3" placeholder="Commenter" value={text} onChange={(e) => setText(e.target.value)}></input>
        <button type="submit" className="btn btn-danger">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}

export default AddComments;
