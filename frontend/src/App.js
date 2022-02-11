//Import mandatories to run the app
import React, { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
//Import components
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  const [auth, setAuth] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user);

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
