import React, { Fragment, useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const registrerNewUser = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/authentification/registrer",
      credentials: true,
      data: {
        email: email,
        password: password,
        username: username,
      },
    })
      .then((response) => {
        window.location = "/accueil";
        console.log(response);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      <div className="login-box_registration">
        <form onSubmit={registrerNewUser}>
          <div className="login-box_registration--username form-group">
            <label>Nom de profil:</label>
            <input type="username" id="username" className="form control" value={username} onChange={(e) => setUserName(e.target.value)}></input>
          </div>
          <div className="login-box_registration--email form-group">
            <label>Email:</label>
            <input type="email" id="email" className="form control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div className="login-box_registration--password form-group">
            <label>Mot de passe:</label>
            <input type="password" id="password" className="form control" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <button>S'inscrire</button>
        </form>
      </div>
    </Fragment>
  );
}

export default Signup;
