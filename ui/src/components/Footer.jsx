import React from "react";

const Footer = (props) => {
  const { darkMode } = props;
  return (
    <>
      {/* Footer */}
      <footer
        className={`p-4 mt-auto ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
        }`}
      >
        <p className="text-center">
          &copy;2024 Pocket Memory. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
