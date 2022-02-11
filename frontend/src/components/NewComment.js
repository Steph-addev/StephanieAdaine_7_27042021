// Import mandatories to run the app
import axios from "../api/axios";
import React, { Fragment, useState } from "react";
// Import front for visuals
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { format } from "timeago.js";
import { Avatar } from "@mui/material";

function NewComment({ comment, userData, postDataId }) {
  const [textUpdate, setTextUpdate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  console.log(userData);

  const dataUpdate = {
    PostId: comment.PostId,
    UserId: comment.UserId,
    content: textUpdate,
  };

  const isMatching = postDataId === comment.PostId;
  const commentMatch = userData.id === comment.UserId;
  console.log(commentMatch);
  console.log(userData.id);
  console.log(comment.UserId);

  const updatePost = async () => {
    if (textUpdate) {
      axios
        .put(`/posts/comment-update/${comment.id}`, dataUpdate, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          setTextUpdate("");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deletePost = async () => {
    axios
      .delete(`/posts/comment-delete/${comment.id}`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {isMatching && (
        <div className="newcomment_content container">
          <div className="newcomment_content-box row">
            <div className="newcomment_content-box--image col-2">
              <Avatar src={userData.profileImage} className="newcomment-image_profile" alt="Photo de profil"></Avatar>
            </div>
            <div className="newcomment_content-box--info col-10">
              <h3 className="newcomment_content--title m-0">{userData.username}</h3>
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
          {(userData.id === comment.UserId || userData.adminRole === true) && (
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
      )}
    </Fragment>
  );
}

export default NewComment;
