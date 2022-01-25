import React, { useState, Fragment } from "react";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const subConnection = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/authentification/connection",
      credentials: true,
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        window.location = "/accueil/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <div className="login-box d-flex">
        <div className="login-box_connection">
          <form action="" onSubmit={subConnection}>
            <div className="login-box_connection--email form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" className="form control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="login-box_connection--password">
              <label htmlFor="password">Mot de passe:</label>
              <input type="password" id="password" className="form control" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Signin;
