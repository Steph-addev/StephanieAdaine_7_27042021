import React, { useState, useEffect, Fragment, useContext } from "react";
import profileImg from "../assets/icon.svg";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../context/AuthContext";
import Comments from "./Comments";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

function NewPost({ post }) {
  const [like, setLike] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const { user } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const dataUpdate = {
    UserId: post.UserId,
    uuid: post.uuid,
    content: textUpdate,
  };

  const likeClick = () => {
    setLike(liked ? like - 1 : like + 1);
    setLiked(true);
  };
  const updatePost = async () => {
    if (textUpdate) {
      axios
        .put(`http://localhost:5000/posts/${post.uuid}`, dataUpdate)
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deletePost = async () => {
    axios
      .delete(`http://localhost:5000/posts/${post.uuid}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${user.userId}`)
      .then((userApi) => {
        setDataUser(userApi.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <div className="newpost d-flex justify-content-center p-3">
        <div className="newpost-news container">
          <div className="row">
            <div className="col-2">
              <img src={dataUser.profileImage} className="newpost-image_profile" alt="test"></img>
            </div>
            <div className="col-6 ">
              <p className="mb-0">{dataUser.username}</p>
              <p>{format(post.createdAt)}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-6 newpost">
              <h2>{post.title}</h2>
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
              <img src={post.images}></img>
              {dataUser.id === post.UserId && (
                <div className="button-container d-flex">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <FaPencilAlt />
                  </div>
                  <div
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
