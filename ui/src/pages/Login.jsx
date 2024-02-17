import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BaseLayout from "../components/BaseLayout";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { token, error, login } = useAuth();

  useEffect(() => {
    if (token) {
      //   navigate("/app");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation to prevent empty fields
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      await login(username, password);
      navigate("/app");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <BaseLayout>
      <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        error={error}
        handleSubmit={handleSubmit}
      />
    </BaseLayout>
  );
};

export default Login;
