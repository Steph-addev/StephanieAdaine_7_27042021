import { React, useState } from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

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
    <div>
      <div>
        <ul>
          <li id="connection" onClick={formAppearance}>
            Se connecter
          </li>
          <li id="registrer" onClick={formAppearance}>
            S'inscrire
          </li>
        </ul>
      </div>
      {signInForm && <Signin />}
      {signUpForm && <Signup />}
    </div>
  );
}

export default Login;
