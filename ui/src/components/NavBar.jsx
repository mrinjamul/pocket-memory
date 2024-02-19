import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  CogIcon,
  InformationCircleIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { useRecoilState } from "recoil";
import { userAtom, tokenAtom, isAuthenticatedAtom } from "../atoms";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  // const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  // const user = useRecoilValue(userAtom);
  const [token, setToken] = useRecoilState(tokenAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);

  const logout = async () => {
    try {
      // Remove token, user, and authentication state
      setToken("");
      setUser(null);
      setIsAuthenticated(false);

      // Redirect to welcome page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const username = isAuthenticated ? user.username : null;
  const homeLink = isAuthenticated ? "/app" : "/";

  return (
    <>
      {/* Navbar */}
      <nav
        className={`p-4 ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">
            <a href={`${homeLink}`}>Pocket Memory</a>
          </div>
          <div className="flex items-center space-x-4 relative">
            {isAuthenticated && (
              <button
                className="text-white hover:text-blue-200 focus:outline-none"
                onClick={handleDropdownToggle}
              >
                <UserCircleIcon className="w-6 h-6" />
              </button>
            )}
            {showDropdown && (
              <div
                className={`absolute top-full right-0 mt-2 w-48 ${
                  darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                } border border-gray-200 shadow-lg rounded`}
              >
                <ul>
                  <li>
                    <Link
                      to={`/${username}`}
                      className={`block py-2 px-4 hover:bg-${
                        darkMode ? "gray-800" : "gray-100"
                      }`}
                    >
                      <UserCircleIcon className="w-6 h-6 inline-block mr-2" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account"
                      className={`block py-2 px-4 hover:bg-${
                        darkMode ? "gray-800" : "gray-100"
                      }`}
                    >
                      <CogIcon className="w-6 h-6 inline-block mr-2" />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={`block py-2 px-4 hover:bg-${
                        darkMode ? "gray-800" : "gray-100"
                      }`}
                    >
                      <InformationCircleIcon className="w-6 h-6 inline-block mr-2" />
                      About
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/"
                      className={`block py-2 px-4 hover:bg-${
                        darkMode ? "gray-800" : "gray-100"
                      }`}
                      onClick={async () => {
                        await logout();
                        // window.location.href = "/";
                      }}
                    >
                      <ArrowLeftEndOnRectangleIcon className="w-6 h-6 inline-block mr-2" />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
            <button
              className="text-white hover:text-blue-200 focus:outline-none"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
