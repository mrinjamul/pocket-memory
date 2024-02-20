import React from "react";

const SignUpForm = (props) => {
  const { setUsername, setEmail, setPassword, handleSignUp, error } = props;
  return (
    <>
      {/* Sign Up Form */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-sm bg-opacity-50 bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label
                className={
                  "block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                }
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                }
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className={
                  "block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                }
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                }
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className={
                  "block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                }
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                }
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Error */}
            {error && (
              <div
                className="m-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="flex items-center justify-between mb-6">
              <button
                className={
                  "py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700 dark:bg-gray-600 dark:hover:bg-gray-500"
                }
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <div className="text-center">
              <p className="text-gray-700 text-sm mb-2">
                Already have an account?
              </p>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/login"
              >
                Login
              </a>
            </div>
          </form>
          <p className={"text-center text-gray-500 text-xs dark:text-gray-200"}>
            &copy;2024 Pocket Memory. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
