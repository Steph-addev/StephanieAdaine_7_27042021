import axios from "../api/axios";
import React, { Fragment, useContext, useState } from "react";
import { FaDoorOpen } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function Logout() {
  const { user } = useContext(AuthContext);
  const [auth, setAuth] = useState(true);

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
