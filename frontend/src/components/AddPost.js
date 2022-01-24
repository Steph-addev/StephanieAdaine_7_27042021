import React from "react";
import { FaImage } from "react-icons/fa";
import profileImg from "../assets/icon.svg";

function AddPost() {
  return (
    <div>
      <div className="addPost d-flex justify-content-center">
        <div className="addPost-publish px-4 py-4">
          <div className="d-flex ">
            <img src={profileImg} className="addPost-image_profile" alt="test"></img>
            <p>Exprimez-vous</p>
          </div>
          <textarea placeholder="Votre message ici" className="my-3"></textarea>
          <div className="d-flex justify-content-around">
            <button className="button-style button-style_image">
              <FaImage />
            </button>
            <button type="submit" className="button-style button-style_publish">
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
