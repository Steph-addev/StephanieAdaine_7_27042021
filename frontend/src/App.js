import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter value={user}>
          <Routes value={user}>
            <Route path="/" element={<Login />} value={user} />
            <Route path="/accueil" element={<Home value={user} />} />
            <Route path="/profil/" element={<Profile value={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
