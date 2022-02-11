//Import to run the app
import React, { useState, Fragment, useContext } from "react";
import { loginCall } from "../apiCall";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
//Import front visuals
import { TextField } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";

function Signin() {
  //Get data from users to log in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Get results from API
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  //The form is submitted and we get back the info
  const subConnection = (e) => {
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);
  };

  //Error handling
  let errorMsg = document.getElementById("errorMessage");
  if (error) {
    errorMsg.innerHTML = "Erreur: veuillez vérifier que votre email et votre mot de passe sont bien correctes";
  }

  // On click, we enter in the authorized route and save the authentication
  const [authUser, setAuthUser] = useState(false);
  let navigate = useNavigate();
  const authAccess = () => {
    if (user.auth === true) {
      navigate("/accueil");
      setAuthUser(true);
      localStorage.setItem("user", user.userId);
      localStorage.setItem("token", user.token);
      localStorage.setItem("admin", user.admin);
    } else {
      navigate("/");
    }
  };

  return (
    <Fragment>
      <section className="login-box container w-100">
        <div className="login-box__connection container justify-content-center p-5">
          <form action="" onSubmit={subConnection}>
            <div className="login-box__connection--email row form-group">
              <label htmlFor="email">Email:</label>
              <TextField required id="outlined-required" label="Required" className="login-box__connection--back" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="login-box__connection--password row form-group">
              <label htmlFor="password">Mot de passe:</label>
              <TextField required id="outlined" label="Required" className="login-box__connection--back" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br></br>
            <div className="row w-30 m-auto">
              <p id="errorMessage" className="font-italic text-danger"></p>
              <button className="btn btn-danger row mt-4 justify-content-center" type="submit" disabled={isFetching} onClick={authAccess}>
                {isFetching ? <Spinner animation="border" variant="light" /> : "Se connecter"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default Signin;
