// Import mandatories to run the app
import axios from "../api/axios";
import React, { Fragment, useState } from "react";
// Import front for visuals
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { format } from "timeago.js";
import { Avatar } from "@mui/material";

function NewComment({ comment, postData, userData }) {
  const [textUpdate, setTextUpdate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const userId = localStorage.getItem("user");
  console.log(postData);

  const dataUpdate = {
    PostId: comment.PostId,
    UserId: comment.UserId,
    content: textUpdate,
  };

  const isMatching = postData.id === comment.PostId;
  const commentMatch = userData.id === comment.UserId;
  console.log();
  console.log("Match userData.id avec userId du commentaire " + commentMatch);
  console.log("userData.id " + userData.id);
  console.log("comment.UserId " + comment.UserId);

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
              <Avatar src={comment.User.profileImage} className="newcomment-image_profile" alt="Photo de profil"></Avatar>
            </div>
            <div className="newcomment_content-box--info col-10">
              <h3 className="newcomment_content--title m-0">{comment.User.username}</h3>
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
          {(commentMatch || userData.adminRole === true) && (
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
