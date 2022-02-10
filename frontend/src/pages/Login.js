import { React, useState } from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import logoRed from "../assets/icon-above-font.svg";

function Login() {
  const [signInForm, setSignInForm] = useState(true);
  const [signUpForm, setSignUpForm] = useState(false);

  const formAppearance = (e) => {
    //TODO: Front: faire un system d'onglet login
    if (e.target.id === "connection") {
      setSignInForm(true);
      setSignUpForm(false);
    } else if (e.target.id === "registrer") {
      setSignUpForm(true);
      setSignInForm(false);
    }
  };

  return (
    <div className="Login-box ">
      <div className="Login-box__clickConnect container">
        <ul className="Login-box__clickConnect--button d-flex m-0 p-0">
          <li id="connection" className="Login-box__clickConnect--title" onClick={formAppearance}>
            Se connecter
          </li>
          <li id="registrer" className="Login-box__clickConnect--title" onClick={formAppearance}>
            S'inscrire
          </li>
        </ul>
        <div className="Login-box__connect">
          <div className="Login-box__connect--logo m-auto pt-4">
            <img src={logoRed} alt="Logo Groupomania"></img>
          </div>
          {signInForm && <Signin />}
          {signUpForm && <Signup />}
        </div>
      </div>
    </div>
  );
}

export default Login;
