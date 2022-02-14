//Import mandatories to run the app
import React, { useState, useEffect, Fragment } from "react";
import axios from "../api/axios";
//Import Components
import AddComment from "./AddComments";
import NewComment from "./NewComment";

function Comments({ postData, userData }) {
  const [newComment, setNewComment] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/posts/${postData.id}/comments`, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        });
        setNewComment(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [postData.id]);

  return (
    <Fragment>
      <div className="comments-box container mt-3">
        <div className="comments-box_newcomment row">
          {newComment.map((dataComment) => (
            <NewComment key={dataComment.id} postData={postData} comment={dataComment} userData={userData} />
          ))}
        </div>
        <div className="comment-box_addcomment row">
          <AddComment postData={postData} userData={userData} />
        </div>
      </div>
    </Fragment>
  );
}

export default Comments;
