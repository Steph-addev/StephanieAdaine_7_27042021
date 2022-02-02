import axios from "axios";
import React, { Fragment } from "react";
import { FaDoorOpen } from "react-icons/fa";
function Logout() {
  const disconnect = async () =>
    await axios
      .get(process.env.REACT_APP_SERVER_URL + "/authentification/logout")
      .then(() => {
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
