import React, { useState, Fragment, useContext, useRef, useEffect } from "react";
import { loginCall } from "../apiCall";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import io from "socket.io-client";

let socket = io("localhost:3001/", { transports: ["websocket"] });

function Signin({ errors }) {
  const userRef = useRef();
  /* const errRef = useRef(); */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*   const [success, setSuccess] = useState(false); */
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const [authUser, setAuthUser] = useState(false);
  let navigate = useNavigate();
  let errorMsg = document.getElementById("errorMessage");

  if (error) {
    errorMsg.innerHTML = "Erreur: veuillez vérifier que votre email et votre mot de passe sont bien correctes";
  }

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //The form is submitted and we get back the info
  const subConnection = (e) => {
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);
  };

  // On click, we enter in the authorized route and save the authentication
  const authAccess = () => {
    socket.emit("join_app", authUser);
    if (user.auth === true) {
      navigate("/accueil");
      setAuthUser(true);
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
            </div>
            <div className="login-box__connection--password row form-group">
              <label htmlFor="password">Mot de passe:</label>
              <TextField required id="outlined" label="Required" className="login-box__connection--back" type="password" ref={userRef} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br></br>
            <div className="row w-30 m-auto">
              <p id="errorMessage" className="font-italic text-danger"></p>
              <button className="btn btn-danger row mt-4 justify-content-center" type="submit" disabled={isFetching} onClick={authAccess}>
                {isFetching ? "chargement" : "Se connecter"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default Signin;
