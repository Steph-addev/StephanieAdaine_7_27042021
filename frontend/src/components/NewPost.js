import React, { useState, useEffect, Fragment } from "react";
import profileImg from "../assets/icon.svg";
import { FaRegThumbsUp } from "react-icons/fa";
/* import { FaRegThumbsDown } from "react-icons/fa"; */
import { FaRegCommentAlt } from "react-icons/fa";
import axios from "axios";

function NewPost({ post }) {
  const [user, setUser] = useState({});
  const [like, setLike] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const likeClick = () => {
    setLike(liked ? like - 1 : like + 1);
    setLiked(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${post.UserId}`)
      .then((userId) => {
        setUser(userId.data);
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
              <img src={profileImg} className="newpost-image_profile" alt="test"></img>
            </div>
            <div className="col-6 ">
              <p className="mb-0">{user.username}</p>
              <p>{post.createdAt}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-6 newpost">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <img src={post.images}></img>
            </div>
            <div className="row text-center">
              <button className="col-4 d-flex newpost_likeComment">
                <FaRegThumbsUp />
                <p>J'aime</p>
                <p onClick={likeClick}>{like}</p>
              </button>
              {/*<button className="col-4 d-flex newpost_likeComment">
                <FaRegThumbsDown />
                <p>Je n'aime pas</p>
          
              </button> */}
              <button className="col-4 d-flex newpost_likeComment">
                <FaRegCommentAlt />
                <p>Commenter</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewPost;
