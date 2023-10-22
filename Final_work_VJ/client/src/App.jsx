import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Header from "./pages/Header";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (email) => {
    if (email) {
      setUserEmail(email);
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setUserEmail("");
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {}
      {loggedIn && <Header userEmail={userEmail} onLogout={handleLogout} />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
