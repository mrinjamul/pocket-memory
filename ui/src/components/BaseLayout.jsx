import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";

import { useRecoilState } from "recoil";
import { themeAtom } from "../atoms";

const BaseLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useRecoilState(themeAtom);

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
