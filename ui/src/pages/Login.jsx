import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";

import BaseLayout from "../components/BaseLayout";
import LoginForm from "../components/LoginForm";
import { tokenAtom, userAtom, isAuthenticatedAtom } from "../atoms";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useRecoilState(tokenAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);

  const apiURL = import.meta.env.VITE_APP_APIURL || "http://localhost:4000";

  const handleLogin = async (event) => {
    event.preventDefault();

    // Basic input validation to prevent empty fields
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post(apiURL + "/auth/login", {
        username,
        password,
      });
      const { token, data } = response.data;

      // Update Recoil atoms with token, user, and authentication state
      setToken(token);
      setUser(data);
      setIsAuthenticated(true);

      // Redirect to home page after successful login
      // navigate("/app");
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error
      setError(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated]);

  return (
    <BaseLayout>
      <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        error={error}
        handleSubmit={handleLogin}
      />
    </BaseLayout>
  );
};

export default Login;
