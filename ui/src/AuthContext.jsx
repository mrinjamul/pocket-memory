import React, { createContext, useState, useEffect, useContext } from "react";

import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const apiURL = import.meta.env.VITE_APP_APIURL || "http://localhost:4000";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load authenticated user from storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setAuthenticated(true);
        setToken(storedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);

  // Update local storage and auth state when token is set
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // check if email
  const isEmail = (input) => {
    // Regular expression to match email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  // Login
  const login = async (username, password) => {
    try {
      let reqBody = {
        username: username,
        password: password,
      };

      if (isEmail(username)) {
        reqBody = {
          email: username,
          password: password,
        };
      }

      const response = await axios.post(apiURL + "/auth/login", reqBody);
      const token = response.data.token;
      const user = response.data.data;
      console.log(response);

      setAuthenticated(true);
      setToken(token);
      setUser(user);
      setError(null);
    } catch (error) {
      console.error("Login error:", error);
      setError(error);
      throw error;
    }
  };
  // Logout
  const logout = async () => {
    setAuthenticated(false);
    setToken("");
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
        loading,
        error,
        setAuthenticated,
        setToken,
        setUser,
        setLoading,
        setError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
