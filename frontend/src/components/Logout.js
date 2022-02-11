//Import mandatories to run the app
import axios from "../api/axios";
import React, { Fragment } from "react";
// Import front visuals
import { FaDoorOpen } from "react-icons/fa";

function Logout() {
  const disconnect = async () =>
    await axios
      .get("/auth/logout", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then(() => {
        localStorage.clear();
        window.location = "/";
      })
      .catch((err) => console.log(err));

  return (
    <Fragment>
      <a className="nav-item nav-link" onClick={disconnect}>
        <FaDoorOpen title="Se déconnecter" />
      </a>
    </Fragment>
  );
}

export default Logout;
