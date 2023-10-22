import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      navigate("/home", { state: { userEmail: email } });
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="box">
      <form>
        <span className="text-center">Admin login</span>
        <div className="input-container">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            className="input-container"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
