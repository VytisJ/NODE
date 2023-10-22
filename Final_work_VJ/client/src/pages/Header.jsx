import React from "react";

function Header({ userEmail, onLogout }) {
  return (
    <div className="header">
      <div className="user-info">Logged in as: {userEmail}</div>
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Header;
