//Import mandatories to run the App
import React, { useState, useEffect, Fragment } from "react";
import axios from "../api/axios";
//Import Components
import Comments from "./Comments";
//Import front visuals
import { format } from "timeago.js";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Avatar } from "@mui/material";
import { FaAngleDoubleDown } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import TextareaAutosize from "@mui/base/TextareaAutosize";

//Function to get all the info of posts after the POST
function NewPost({ postData, users }) {
  //Media queries
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 426px)" });

  //Data app
  const [dataUser, setDataUser] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const userId = localStorage.getItem("user");
  const isAdmin = localStorage.getItem("admin");

  const isMatching = postData.UserId === parseInt(userId);

  //Server adress to get the pictures stored in: backend/images
  const PF = process.env.REACT_APP_PICTURES_URL;

  const dataUpdate = {
    UserId: postData.UserId,
    id: postData.id,
    content: textUpdate,
  };

  const updatePost = async () => {
    if (textUpdate) {
      axios
        .put(`/posts/${postData.id}`, dataUpdate, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {});
    }
  };

  const deletePost = async () => {
    axios
      .delete(`/posts/${postData.id}`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };

  //Uniquement pour faire passer le props dans le composant "Comments"
  useEffect(() => {
    axios
      .get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((err) => {});
  }, [userId]);

  return (
    <Fragment>
      <div className="newpost-news card-post  container-fluid justify-content-center p-0">
        <div
          className={users
            .map((user) => {
              if (user.id === postData.UserId) return user.adminRole === true ? "card-post card-post_admin container-fluid p-3" : "card-post card-post_users container-fluid p-3";
              else return null;
            })
            .join("")}
        >
          <div className="row">
            <div className="col-3 col-sm-2 pe-3">
              <Avatar
                src={users
                  .map((user) => {
                    if (user.id === postData.UserId) return user.profileImage ? user.profileImage : PF + "profile-picture.png";
                    else return null;
                  })
                  .join("")}
                className="newpost-image_profile"
                alt="test"
              ></Avatar>
            </div>
            <div className="col-9 col-sm-10 ps-0">
              <h3 className="mb-0 newpost-font_h3">
                {users
                  .map((user) => {
                    if (user.id === postData.UserId) return user.username;
                    else return null;
                  })
                  .join("")}
              </h3>
              <p className="newpost-font_time">{format(postData.createdAt, "fr")}</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-11 newpost container">
              {isUpdated === false && <p className="newpost-font_content row ms-sm-5 ms-1">{postData.content}</p>}
              {isUpdated && (
                <div className="newpost-news_update">
                  <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" style={{ borderRadius: 20, padding: 10 }} defaultValue={postData.content} onChange={(e) => setTextUpdate(e.target.value)} />
                  <div className="newpost-news_update--button-container">
                    <button type="submit" className="newpost-news_update--btn btn btn-danger my-3" onClick={updatePost}>
                      Valider les modifications
                    </button>
                  </div>
                </div>
              )}
              {postData.images !== "" ? <img src={postData.images} alt={postData.User.username} className="newpost-news_image row ms-sm-5 ms-1"></img> : ""}
              {(isMatching || isAdmin === "true") && (
                <div className="button-container row justify-content-end p-3">
                  <button aria-label="modify" onClick={() => setIsUpdated(!isUpdated)} className="newpost-box_icons--update icons-update-delete p-2 mx-2 col-1">
                    <FaPencilAlt aria-label="pencil" />
                  </button>
                  <button
                    aria-label="delete"
                    className="newpost-box_icons--update p-2 mx-2 col-1 icons-update-delete"
                    onClick={() => {
                      if (window.confirm("Voulez-vous supprimer votre publication?")) deletePost();
                    }}
                  >
                    <FaTrashAlt aria-label="trash" />
                  </button>
                </div>
              )}
            </div>

            <div className="row newpost-news_interactions">
              <button aria-label="comments" className="col-4 d-flex newpost_comment button-comments align-items-center mt-3" onClick={() => setShowComments(!showComments)}>
                {isMobile && <FaRegCommentAlt className="comment-icon" />}
                {isTabletOrDesktop && (
                  <p>
                    Commentaires <FaAngleDoubleDown />
                  </p>
                )}
              </button>
            </div>
          </div>

          {showComments && (
            <div className="row newpost-comments">
              <Comments postData={postData} userData={dataUser} />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default NewPost;
