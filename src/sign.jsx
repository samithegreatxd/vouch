// Sign.jsx
import React from "react";
import { useAuth } from "./authcontext";
import "./Sign.css";

const Sign = () => {
  const { login, user, isAdmin } = useAuth();

  if (user) {
    return (
      <div className="sign-shell">
        <div className="sign-card">
          <h1 className="sign-title">
            {isAdmin ? "Admin has logged in" : `Welcome ${user.displayName}`}
          </h1>
          <p className="sign-description">
            {isAdmin
              ? "You have full admin access."
              : "You are logged in as a regular user."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sign-shell">
      <div className="sign-card">
        <p className="sign-eyebrow">Attention</p>
        <h1 className="sign-title">Are you Sami?</h1>
        <p className="sign-description">
          Please sign in with your Google account to continue.
        </p>
        <button className="sign-btn" onClick={login}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Sign;