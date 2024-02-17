import React from "react";
import { useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";

const BaseLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}
      style={{ backgroundColor: darkMode ? "#1F2937" : "#FFFFFF" }}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {children}
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default BaseLayout;
