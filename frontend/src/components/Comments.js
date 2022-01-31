import React, { useState, useEffect, Fragment } from "react";
/*import { AuthContext } from "../context/AuthContext"; */
import AddComment from "./AddComments";
import NewComment from "./NewComment";
import axios from "axios";

function Comments({ post, userInfo }) {
  const [newComment, setNewComment] = useState([]);
  const [isComment, setIsComment] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/posts/comment-display/${post.id}`);
        setNewComment(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, []);

  return (
    <Fragment>
      <div className="comments-box container">
        <div className="comments-box_newcomment row">
          {newComment.map((dataComment) => (
            <NewComment key={dataComment.id} comment={dataComment} userInfo={userInfo} post={post} />
          ))}
        </div>
        <div className="comment-box_addcomment row">
          <AddComment postId={post} userInfo={userInfo.id} />
        </div>
      </div>
    </Fragment>
  );
}

export default Comments;
