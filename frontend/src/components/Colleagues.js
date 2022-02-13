import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Avatar } from "@mui/material";
import { FaAngleDoubleLeft } from "react-icons/fa";
import MediaQuery from "react-responsive";

export default function SwipeableTemporaryDrawer({ users }) {
  const [state, setState] = React.useState({
    right: false,
  });
  const PF = process.env.REACT_APP_PICTURES_URL;

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      <h3>Mes collègues</h3>
      <Divider />
      <Box>
        <div className="colleagues">
          <div className="colleagues-list">
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
      </Box>
    </Box>
  );

  return (
    <React.Fragment>
      <MediaQuery maxWidth={425}>
        <div>
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)} className="btn-sidebars justify-content-end">
                <FaAngleDoubleLeft />
              </Button>
              <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))}
        </div>
      </MediaQuery>
      <MediaQuery minWidth={426}>
        <div className="colleagues">
          <div className="colleagues-list">
            <p>Mes collègues</p>
            <ul className="p-0">
              {users.map((param) => (
                <li key={param.id} post={param} className="colleagues-list_data p-1">
                  <Avatar src={param.profileImage ? param.profileImage : PF + "profile-picture.png"} className="colleagues-list_data--profilePic" alt="profil pic"></Avatar>
                  {param.username}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MediaQuery>
    </React.Fragment>
  );
}

/* //Import mandatories to run the app
import React from "react";
// Import front visuals
import { Avatar } from "@mui/material";

function Colleagues({ users }) {
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

export default Colleagues; */
