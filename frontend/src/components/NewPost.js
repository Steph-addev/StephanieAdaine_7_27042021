import React, { useState, useEffect, Fragment, useContext } from "react";
import profileImg from "../assets/icon.svg";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../context/AuthContext";

function NewPost({ post }) {
  const [like, setLike] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const { user } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState({});

  const likeClick = () => {
    setLike(liked ? like - 1 : like + 1);
    setLiked(true);
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
