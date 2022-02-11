//Import mandatories to run the app
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// Import front visuals
import { Avatar } from "@mui/material";

function Colleagues({ users }) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PICTURES_URL;

  return (
    <div className="colleagues">
      <div className="colleagues-list">
        <p>Mes collègues</p>

        <ul>
          {users.map((param) => (
            <li key={param.id} post={param} className="colleagues-list_data p-1">
              <Avatar src={param.profileImage ? param.profileImage : PF + "profile-picture.png"} className="colleagues-list_data--profilePic" alt="profil pic"></Avatar>
              {param.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Colleagues;
