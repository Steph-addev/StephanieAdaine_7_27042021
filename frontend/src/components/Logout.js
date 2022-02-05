import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import { FaDoorOpen } from "react-icons/fa";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

function Logout() {
  const { user } = useContext(AuthContext);
  const [auth, setAuth] = useState(true);

  const disconnect = async () =>
    await axios
      .get(process.env.REACT_APP_SERVER_URL + "/authentification/logout")
      .then(() => {
        Cookies.remove("jwt");
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
