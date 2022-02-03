import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";
import { AuthContextProvider } from "./context/AuthContext";
import Cookies from "js-cookie";

function App() {
  const { user } = useContext(AuthContext);
  const [auth, setAuth] = useState(false);

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
            <Route path="/accueil" element={<Home />} />
            <Route path="/profil/" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
