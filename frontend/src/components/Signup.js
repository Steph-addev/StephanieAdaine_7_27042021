//Import mandatories  to run the app
import React, { Fragment, useState } from "react";
import axios from "../api/axios";
//Import front visuals
import { TextField } from "@mui/material";

function Signup() {
  //Get new user infos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordBis, setPasswordBis] = useState("");

  // Get errors
  const [error, setError] = useState("");
  let notMatch = document.getElementById("password-check");

  const registrerNewUser = async (event) => {
    event.preventDefault();
    if (passwordBis !== password) {
      notMatch.innerHTML = "Le mot de passe est différent";
    } else {
      const user = {
        email: email,
        password: password,
        username: username,
      };
      try {
        const res = await axios.post("/auth/registrer", user);
        window.location = "/";
      } catch (err) {
        setError(err);
      }
    }
  };
  return (
    <Fragment>
      <section className="login-box container w-100">
        <div className="login-box_registration container justify-content-center p-5">
          <form onSubmit={registrerNewUser}>
            <div className="login-box_registration--username row form-group">
              <label>Nom de profil:</label>
              <TextField required id="username" label="Required" className="login-box__connection--back" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="login-box_registration--email row form-group">
              <label>Email:</label>
              <TextField required id="email" label="Required" className="login-box__connection--back" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="login-box_registration--password row form-group">
              <label>Mot de passe:</label>
              <TextField required id="password" label="Required" className="login-box__connection--back" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="login-box_registration--password-bis row form-group">
              <label>Confirmer votre mot de passe:</label>
              <TextField required id="password-bis" label="Required" className="login-box__connection--back" type="password" value={passwordBis} onChange={(e) => setPasswordBis(e.target.value)} />
              <span id="password-check" className="font-italic text-danger"></span>
            </div>
            <button className="btn btn-danger row mt-4 justify-content-center">S'inscrire</button>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default Signup;
