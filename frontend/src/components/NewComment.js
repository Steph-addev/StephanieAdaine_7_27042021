import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AddPostPicture from "./AddPostPicture";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { format } from "timeago.js";

function NewComment({ comment, userInfo, post }) {
  const { user } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState({});
  const [textUpdate, setTextUpdate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  console.log(comment.UserId);
  console.log(comment.PostId);
  console.log(comment.id);

  const dataUpdate = {
    PostId: comment.PostId,
    UserId: comment.UserId,
    id: comment.id,
    content: textUpdate,
  };

  const updatePost = async () => {
    if (textUpdate) {
      axios
        .put(`http://localhost:5000/posts/comment-update/${post.id}`, dataUpdate)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deletePost = async () => {
    axios
      .delete(`http://localhost:5000/posts/comment-delete/${post.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*   useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/comment-display/${post.id}`)
      .then((userApi) => {
        setDataUser(userApi.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); */

  return (
    <Fragment>
      <div className="newcomment_content container">
        <div className="newcomment_content-box row">
          <div className="newcomment_content-box--image col-2">
            <AddPostPicture />
          </div>
          <div className="newcomment_content-box--info col-10">
            <h3 className="newcomment_content--title m-0">{userInfo.username}</h3>
            <p>{format(comment.createdAt)}</p>
          </div>
        </div>
        <div className="newcomment_content-box--content row">
          {isUpdated === false && <p className="my-0">{comment.content}</p>}
          {isUpdated && (
            <div className="newcomment-box_update">
              <textarea defaultValue={comment.content} onChange={(e) => setTextUpdate(e.target.value)} />
              <div className="newcomment-box_update--button-container">
                <button type="submit" className="comments-box_update--btn" onClick={updatePost}>
                  Valider les modifications
                </button>
              </div>
            </div>
          )}
        </div>

        {userInfo.id === comment.UserId && (
          <div className="newcomment-box_icons row justify-content-end">
            <div onClick={() => setIsUpdated(!isUpdated)} className="newcomment-box_icons--update col-1">
              <FaPencilAlt />
            </div>
            <div
              className="newcomment-box_icons--delete col-1"
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer votre publication?")) deletePost();
              }}
            >
              <FaTrashAlt />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default NewComment;
