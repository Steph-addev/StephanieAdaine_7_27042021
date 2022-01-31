import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AddPostPicture from "./AddPostPicture";
import { FaRegCommentAlt } from "react-icons/fa";

function NewComment({ comment, userInfo, postId }) {
  const { user } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/comment-display/${postId}`)
      .then((userApi) => {
        setDataUser(userApi.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <div>
        <div className="newcomment">
          <div className="newcomment_content d-flex">
            <AddPostPicture />
            <div className="newcomment_content--box">
              <h3 className="newcomment_content--title m-0">{userInfo.username}</h3>
              <p>{comment.content}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewComment;
