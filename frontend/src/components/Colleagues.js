import React from "react";

function Colleagues({ users }) {
  const PF = process.env.REACT_APP_PICTURES_URL;

  return (
    <div className="colleagues">
      <div className="colleagues-list">
        <p>Mes collègues</p>
        <ul>
          {users.map((param) => (
            <li key={param.id} post={param} className="colleagues-list_data p-1">
              <img src={param.profileImage ? param.profileImage : PF + "profile-picture.png"} className="colleagues-list_data--profilePic" alt="profil pic"></img>
              {param.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Colleagues;
