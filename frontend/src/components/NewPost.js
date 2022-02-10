import React, { useState, useEffect, Fragment, useContext } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import axios from "../api/axios";
import { format } from "timeago.js";
import { AuthContext } from "../context/AuthContext";
import Comments from "./Comments";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Avatar } from "@mui/material";

function NewPost({ postData, users }) {
  /*   const [like, setLike] = useState(post.likes);
  const [liked, setLiked] = useState(false); */
  const { user } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);

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
        .then((res) => {})
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
      .then((res) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    axios
      .get(`/users/${user.userId}`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((userApi) => {
        setDataUser(userApi.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Fragment>
      <div className="newpost justify-content-center p-3">
        <div
          className={users
            .map((user) => {
              if (user.id === postData.UserId) return user.adminRole === true ? "newpost-news-admin container px-4 py-4" : "newpost-news container px-4 py-4";
              else return null;
            })
            .join("")}
        >
          <div className="row">
            <div className="col-2">
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
            <div className="col-6 ">
              <p className="mb-0">
                {users
                  .map((user) => {
                    if (user.id === postData.UserId) return user.username;
                    else return null;
                  })
                  .join("")}
              </p>
              <p>{format(postData.createdAt)}</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-11 newpost">
              {isUpdated === false && <p>{postData.content}</p>}
              {isUpdated && (
                <div className="newpost-news_update">
                  <textarea defaultValue={postData.content} onChange={(e) => setTextUpdate(e.target.value)} />
                  <div className="newpost-news_update--button-container">
                    <button type="submit" className="newpost-news_update--btn" onClick={updatePost}>
                      Valider les modifications
                    </button>
                  </div>
                </div>
              )}
              {postData.images !== "" ? <img src={postData.images} alt="photo postée par l'utilisateur" className="newpost-news_image"></img> : ""}
              {(dataUser.id === postData.UserId || dataUser.adminRole === true) && (
                <div className="button-container row justify-content-end">
                  <button onClick={() => setIsUpdated(!isUpdated)} className="newpost-box_icons--update col-1">
                    <FaPencilAlt />
                  </button>
                  <button
                    className="newpost-box_icons--update col-1"
                    onClick={() => {
                      if (window.confirm("Voulez-vous supprimer votre publication?")) deletePost();
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              )}
            </div>
            <div className="row newpost-news_interactions">
              <button className="col-4 d-flex newpost_likeComment">
                <FaRegThumbsUp />
                <p>J'aime</p>
                {/*                 <p onClick={likeClick}>{like}</p> */}
              </button>
              <button className="col-4 d-flex newpost_likeComment" onClick={() => setShowComments(!showComments)}>
                <FaRegCommentAlt />
                <p>Commenter</p>
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
