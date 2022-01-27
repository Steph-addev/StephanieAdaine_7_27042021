import React, { useState, useEffect, Fragment } from "react";
import profileImg from "../assets/icon.svg";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import axios from "axios";

function NewPost() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:5000/users`);
      console.log(res);
      setUser(res.data);
    };
    fetchUser();
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
              <p className="mb-0"></p>
              <p>Publié il y a</p>
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-6">
              <p>text</p>
            </div>
            <div className="row text-center">
              <button className="col-4 d-flex newpost_likeComment">
                <FaRegThumbsUp />
                <p>J'aime</p>
              </button>
              <button className="col-4 d-flex newpost_likeComment">
                <FaRegThumbsDown />
                <p>Je n'aime pas</p>
              </button>
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
