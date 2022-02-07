import React, { useState, useEffect, Fragment } from "react";
/*import { AuthContext } from "../context/AuthContext"; */
import AddComment from "./AddComments";
import NewComment from "./NewComment";
import axios from "axios";

function Comments({ postData, userData }) {
  const [newComment, setNewComment] = useState([]);
  console.log(userData);
  console.log(postData);

  useEffect(() => {
    const fetchComments = () => {
      try {
        const res = axios.get(process.env.REACT_APP_SERVER_URL + `/posts/comment-display/${postData.id}`);
        setNewComment(res.data);
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
  }, [postData.id]);

  return (
    <Fragment>
      <div className="comments-box container">
        <div className="comments-box_newcomment row">
          {newComment.map((dataComment) => (
            <NewComment key={dataComment.id} postDataId={postData.id} comment={dataComment} userData={userData} />
          ))}
        </div>
        <div className="comment-box_addcomment row">
          <AddComment postDataId={postData.id} userDataId={userData.id} />
        </div>
      </div>
    </Fragment>
  );
}

export default Comments;
