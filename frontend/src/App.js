import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import Cookies from "js-cookie";
import ProtectedRoute from "./components/ProtectedRoute";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  const [auth, setAuth] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user);

  const readCookie = () => {
    const cookieUser = Cookies.get("jwt");
    if (cookieUser) {
      setAuth(true);
    }
  };
  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      <AuthContextProvider value={{ auth, setAuth }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/accueil" element={<Home />} />
              <Route path="/profil/" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
