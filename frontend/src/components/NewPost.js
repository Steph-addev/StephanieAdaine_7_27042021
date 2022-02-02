import React, { useState, useEffect, Fragment, useContext } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../context/AuthContext";
import Comments from "./Comments";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

function NewPost({ post, users }) {
  const [like, setLike] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const { user } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const PF = process.env.REACT_APP_PICTURES_URL;

  const dataUpdate = {
    UserId: post.UserId,
    id: post.id,
    content: textUpdate,
  };

  const likeClick = () => {
    setLike(liked ? like - 1 : like + 1);
    setLiked(true);
  };
  const updatePost = async () => {
    if (textUpdate) {
      axios
        .put(`http://localhost:5000/posts/${post.id}`, dataUpdate)
        .then((res) => {})
        .catch((err) => {});
    }
  };

  const deletePost = async () => {
    axios
      .delete(`http://localhost:5000/posts/${post.id}`)
      .then((res) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${user.userId}`)
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
              if (user.id === post.UserId) return user.adminRole === true ? "newpost-news-admin container px-4 py-4" : "newpost-news container px-4 py-4";
              else return null;
            })
            .join("")}
        >
          <div className="row">
            <div className="col-2">
              <img
                src={users
                  .map((user) => {
                    if (user.id === post.UserId) return user.profileImage ? user.profileImage : PF + "profile-picture.png";
                    else return null;
                  })
                  .join("")}
                className="newpost-image_profile"
                alt="test"
              ></img>
            </div>
            <div className="col-6 ">
              <p className="mb-0">
                {users
                  .map((user) => {
                    if (user.id === post.UserId) return user.username;
                    else return null;
                  })
                  .join("")}
              </p>
              <p>{format(post.createdAt)}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11 newpost">
              {isUpdated === false && <p>{post.content}</p>}
              {isUpdated && (
                <div className="newpost-news_update">
                  <textarea defaultValue={post.content} onChange={(e) => setTextUpdate(e.target.value)} />
                  <div className="newpost-news_update--button-container">
                    <button type="submit" className="newpost-news_update--btn" onClick={updatePost}>
                      Valider les modifications
                    </button>
                  </div>
                </div>
              )}
              <img src={post.images} alt="photo postée par utilisateur" name="image"></img>
              {dataUser.id === post.UserId && (
                <div className="button-container row justify-content-end">
                  <div onClick={() => setIsUpdated(!isUpdated)} className="newpost-box_icons--update col-1">
                    <FaPencilAlt />
                  </div>
                  <div
                    className="newpost-box_icons--update col-1"
                    onClick={() => {
                      if (window.confirm("Voulez-vous supprimer votre publication?")) deletePost();
                    }}
                  >
                    <FaTrashAlt />
                  </div>
                </div>
              )}
            </div>
            <div className="row text-center">
              <button className="col-4 d-flex newpost_likeComment">
                <FaRegThumbsUp />
                <p>J'aime</p>
                <p onClick={likeClick}>{like}</p>
              </button>
              <button className="col-4 d-flex newpost_likeComment" onClick={() => setShowComments(!showComments)}>
                <FaRegCommentAlt />
                <p>Commenter</p>
              </button>
            </div>
          </div>

          {showComments && (
            <div className="row newpost-comments">
              <Comments post={post} userInfo={dataUser} />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default NewPost;
