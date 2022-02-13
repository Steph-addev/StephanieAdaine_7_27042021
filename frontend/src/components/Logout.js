//Import mandatories to run the app
import axios from "../api/axios";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

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
      })
      .catch((err) => console.log(err));

  return (
    <Fragment>
      <Link to="/" className="nav-item nav-link" onClick={disconnect}>
        Se déconnecter
      </Link>
    </Fragment>
  );
}

export default Logout;
