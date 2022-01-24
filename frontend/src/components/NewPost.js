import React from "react";
import profileImg from "../assets/icon.svg";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";

function NewPost() {
  return (
    <div>
      <div className="newpost d-flex justify-content-center">
        <div className="newpost-news container">
          <div className="row">
            <div className="col-2">
              <img src={profileImg} className="newpost-image_profile" alt="test"></img>
            </div>
            <div className="col-6 ">
              <p className="mb-0">UserName</p>
              <p>Publié il y a</p>
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-6">
              <p>text</p>
            </div>
            <div className="row text-center">
              <button className="col-6 d-flex newpost_likeComment">
                <FaRegHeart />
                <p>J'aime</p>
              </button>
              <button className="col-6 d-flex newpost_likeComment">
                <FaRegCommentAlt />
                <p>Commenter</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
