import React, { Fragment, useRef } from "react";
import axios from "../api/axios";

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
              <input type="username" id="username" className="form control" ref={username} required></input>
            </div>
            <div className="login-box_registration--email form-group">
              <label>Email:</label>
              <input type="email" id="email" className="form control" ref={email} required></input>
            </div>
            <div className="login-box_registration--password form-group">
              <label>Mot de passe:</label>
              <input type="password" id="password" className="form control" ref={password} required></input>
            </div>
            <div className="login-box_registration--password-bis form-group">
              <label>Confirmer votre mot de passe:</label>
              <input type="password" id="password-bis" className="form control" ref={passwordBis} required></input>
            </div>
            <button className="btn btn-danger row mt-4 justify-content-center">S'inscrire</button>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default Signup;
