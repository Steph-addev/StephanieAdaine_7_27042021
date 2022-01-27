import React, { useState, Fragment } from "react";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let emailError = document.getElementById("email-check-error");
  let passwordError = document.getElementById("password-check-error");

  const [loginStatus, setloginStatus] = useState(false);

  const subConnection = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/authentification/login",
      credentials: true,
      data: {
        email: email,
        password: password,
      },
    })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
        if (resp.data.errors) {
          emailError.textContent = resp.data.errors.email;
          passwordError.textContent = resp.data.errors.password;
          setloginStatus(false);
        } else {
          window.location = "/accueil/";
          setloginStatus(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setloginStatus(false);
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
              <span id="email-check-error"></span>
            </div>
            <div className="login-box_connection--password">
              <label htmlFor="password">Mot de passe:</label>
              <input type="password" id="password" className="form control" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <span id="password-check-error"></span>
            </div>
            <button type="submit" status={loginStatus.toString()}>
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Signin;
