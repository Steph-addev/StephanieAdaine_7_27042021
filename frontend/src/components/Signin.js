import React, { useState, Fragment, useContext, useRef, useEffect } from "react";
import { loginCall } from "../apiCall";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

function Signin() {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const [authUser, setAuthUser] = useState(false);
  let navigate = useNavigate();

  //
  let emailError = document.getElementById("email-check-error");
  let passwordError = document.getElementById("password-check-error");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const subConnection = (e) => {
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);
  };

  const authAccess = () => {
    if (user.auth === true) {
      navigate("/accueil");
      setAuthUser({ loggedIn: true });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", user.token);
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
              <TextField required id="outlined-required" label="Required" className="login-box__connection--back" type="email" ref={userRef} value={email} onChange={(e) => setEmail(e.target.value)} />
              <span id="email-check-error"></span>
            </div>
            <div className="login-box__connection--password row form-group">
              <label htmlFor="password">Mot de passe:</label>
              <TextField required id="outlined" label="Required" className="login-box__connection--back" type="password" ref={userRef} value={password} onChange={(e) => setPassword(e.target.value)} />
              <span id="password-check-error"></span>
            </div>
            <button className="btn btn-danger row mt-4 justify-content-center" type="submit" disabled={isFetching} onClick={authAccess}>
              {isFetching ? "chargement" : "Se connecter"}
            </button>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default Signin;
