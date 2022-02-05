import React, { useState, Fragment, useContext } from "react";
import { loginCall } from "../apiCall";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*   let emailError = document.getElementById("email-check-error");
  let passwordError = document.getElementById("password-check-error"); */
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  console.log(user);
  const [authUser, setAuthUser] = useState(false);
  let navigate = useNavigate();

  const subConnection = (e) => {
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);
  };

  return (
    <Fragment>
      <div className="login-box container">
        <div className="login-box__connection container justify-content-center p-5">
          <form action="" onSubmit={subConnection}>
            <div className="login-box__connection--email row form-group">
              <label htmlFor="email">Email:</label>
              <input required type="email" id="email" className="form control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              <span id="email-check-error"></span>
            </div>
            <div className="login-box__connection--password row">
              <label htmlFor="password">Mot de passe:</label>
              <input required type="password" id="password" className="form control" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <span id="password-check-error"></span>
            </div>
            <button
              type="submit"
              disabled={isFetching}
              onClick={() => {
                if (user.auth === true) {
                  setAuthUser({ loggedIn: true });
                  Cookies.set("jwt", user.token, { sameSite: "strict" });
                  localStorage.setItem("isAuthenticated", "true");
                  navigate("/accueil");
                } else {
                  navigate("/");
                }
              }}
            >
              {isFetching ? "chargement" : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Signin;
