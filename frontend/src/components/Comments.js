import React, { useState, useEffect, Fragment } from "react";
/*import { AuthContext } from "../context/AuthContext"; */
import AddComment from "./AddComments";
import NewComment from "./NewComment";
import axios from "../api/axios";

function Comments({ postData, userData }) {
  const [newComment, setNewComment] = useState([]);
  console.log(newComment);
  console.log(postData.id);

  useEffect(() => {
    const fetchComments = () => {
      try {
        const res = axios.get(`/posts/${postData.id}/comment-display`, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        });
        setNewComment(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();

    /*     const fetchComments = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/posts/comment-display/${postData.id}`);
        setNewComment(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments(); */
  }, []);

  return (
    <Fragment>
      <div className="comments-box container">
        <div className="comments-box_newcomment row">
          {/*           {newComment.map((dataComment) => (
            <NewComment key={dataComment.id} postDataId={postData.id} comment={dataComment} userData={userData} />
          ))} */}
        </div>
        <div className="comment-box_addcomment row">
          <AddComment postDataId={postData.id} userData={userData} />
        </div>
      </div>
    </Fragment>
  );
}

export default Comments;
