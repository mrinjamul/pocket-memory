import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { isAuthenticatedAtom } from "../atoms";

import BaseLayout from "../components/BaseLayout";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);

  const apiURL = import.meta.env.VITE_APP_APIURL || "http://localhost:4000";

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Basic input validation to prevent empty fields
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    if (!email) {
      setError("Please enter email.");
      return;
    }

    try {
      const response = await axios.post(apiURL + "/auth/signup", {
        username,
        email,
        password,
      });
      if (response.status == 200) {
        navigate("/login");
      } else {
        setError("failed to signup");
      }
    } catch (error) {
      console.error("Sign Up error:", error);
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
      <SignUpForm
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignUp={handleSignUp}
        error={error}
      />
    </BaseLayout>
  );
};

export default SignUp;
