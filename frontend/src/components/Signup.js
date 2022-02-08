import React, { Fragment, useRef } from "react";
import axios from "../api/axios";
import { TextField } from "@mui/material";

function Signup() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordBis = useRef();

  const registrerNewUser = async (event) => {
    event.preventDefault();
    if (passwordBis.current.value !== password.current.value) {
      passwordBis.current.setCustomValidity("Le mot de passe est différent");
    } else {
      const user = {
        email: email.current.value,
        password: password.current.value,
        username: username.current.value,
      };
      try {
        const res = await axios.post("/authentification/registrer", user);
        window.location = "/";
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Fragment>
      <section className="login-box container w-100">
        <div className="login-box_registration container justify-content-center p-5">
          <form onSubmit={registrerNewUser}>
            <div className="login-box_registration--username form-group">
              <label>Nom de profil:</label>
              <TextField required id="username" label="Required" className="login-box__connection--back" type="text" ref={username} />
            </div>
            <div className="login-box_registration--email form-group">
              <label>Email:</label>
              <TextField required id="email" label="Required" className="login-box__connection--back" type="email" ref={email} />
            </div>
            <div className="login-box_registration--password form-group">
              <label>Mot de passe:</label>
              <TextField required id="password" label="Required" className="login-box__connection--back" type="password" ref={password} />
            </div>
            <div className="login-box_registration--password-bis form-group">
              <label>Confirmer votre mot de passe:</label>
              <TextField required id="password-bis" label="Required" className="login-box__connection--back" type="password" ref={passwordBis} />
            </div>
            <button className="btn btn-danger row mt-4 justify-content-center">S'inscrire</button>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default Signup;
