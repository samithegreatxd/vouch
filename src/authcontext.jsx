// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Detect login changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email === "sami10121970@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      setUser(loggedUser);
      if (loggedUser.email === "sami10121970@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Try again!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy use
export const useAuth = () => useContext(AuthContext);