import React from "react";

function ProfilePicture() {
  /*   const setNewImage = preventDefault; */

  return (
    <div>
      <form className="profileForm-box_image d-flex" method="post" action="/upload" encType="multipart/form-data">
        <img src="" alt="" className="profileForm-box_image--picture"></img>
        <input type="file" className="profileForm-box_image--input" name="image"></input>
        <input type="submit"></input>
        <label className="profileForm-box_image--label" htmlFor="file">
          Changer sa photo de profil
        </label>
      </form>
    </div>
  );
}

export default ProfilePicture;
