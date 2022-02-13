// Import mandatories to run the app
import axios from "../api/axios";
import React, { Fragment, useState } from "react";
// Import front for visuals
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { format } from "timeago.js";
import { Avatar } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";

function NewComment({ comment, postData, userData }) {
  const [textUpdate, setTextUpdate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const dataUpdate = {
    PostId: comment.PostId,
    UserId: comment.UserId,
    content: textUpdate,
  };

  const isMatching = postData.id === comment.PostId;
  const commentMatch = userData.id === comment.UserId;

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
        <div className="newcomment_content container py-2">
          <div className="newcomment_content-box row">
            <div className="newcomment_content-box--image col-3 col-sm-2 pe-3">
              <Avatar src={comment.User.profileImage} className="newcomment-image_profile" alt="Photo de profil"></Avatar>
            </div>
            <div className="newcomment_content-box--info col-9 col-sm-10 ps-0">
              <h3 className="newcomment-font_h3 m-0">{comment.User.username}</h3>
              <p className="newcomment-font_time">{format(comment.createdAt)}</p>
            </div>
          </div>
          <div className="newcomment_content-box--content row">
            {isUpdated === false && <p className="my-0 newcomment-font_content">{comment.content}</p>}
            {isUpdated && (
              <div className="newcomment-box_update">
                <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" style={{ borderRadius: 20, padding: 10 }} defaultValue={comment.content} onChange={(e) => setTextUpdate(e.target.value)} />
                <div className="newcomment-box_update--button-container">
                  <button type="submit" className="comments-box_update--btn btn btn-danger my-3" onClick={updatePost}>
                    Valider
                  </button>
                </div>
              </div>
            )}
          </div>
          {(commentMatch || userData.adminRole === true) && (
            <div className="newcomment-box_icons row justify-content-end p-3">
              <div onClick={() => setIsUpdated(!isUpdated)} className="newcomment-box_icons--update mx-2 col-1 icons-update-delete">
                <FaPencilAlt aria_label="pencil" />
              </div>
              <div
                className="newcomment-box_icons--delete mx-2 col-1 icons-update-delete"
                onClick={() => {
                  if (window.confirm("Voulez-vous supprimer votre publication?")) deletePost();
                }}
              >
                <FaTrashAlt aria_label="trash" />
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
}

export default NewComment;
