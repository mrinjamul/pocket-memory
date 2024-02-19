import React from "react";

const Hero = () => {
  let isAuthenticated = false;

  const getStarted = (event) => {
    if (isAuthenticated) {
      window.location.href = "/app";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className={"text-4xl font-bold text-gray-800 dark:text-white"}>
            Welcome to Pocket Memory
          </h1>
          <p className={"mt-4 text-gray-600 dark:text-gray-300"}>
            Your one-stop solution for organizing and storing memories!
          </p>
          <button
            className={
              "mt-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }
            onClick={(event) => {
              getStarted();
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
