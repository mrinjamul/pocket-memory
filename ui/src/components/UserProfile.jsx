import React from "react";
import avatar from "../assets/avatar.png";

const UserProfile = (props) => {
  const { user } = props;

  // Calculate the time difference between two dates in human-readable format
  const timeDiff = (date) => {
    const diff = Date.now() - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };

  // Function to convert timestamp to human-readable date and time
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      {/* Profile Section */}
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-xl bg-opacity-50 bg-white dark:bg-gray-700 shadow-md rounded-lg p-8">
          <div className="flex items-center mb-6">
            <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
            <div className="ml-4">
              {user.name && (
                <h2
                  className={
                    "text-lg font-semibold text-gray-800 dark:text-white"
                  }
                >
                  {user.name}
                </h2>
              )}
              <p
                className={
                  "text-sm font-semibold text-gray-600 dark:text-gray-300"
                }
              >
                @{user.username}
              </p>
            </div>
          </div>
          <p className={"text-sm mb-2 text-gray-600 dark:text-gray-300"}>
            {user.email}
          </p>
          <p className={"text-sm mb-2 text-gray-600 dark:text-gray-300"}>
            {user.bio}
          </p>
          <p className={"text-sm text-gray-600 dark:text-gray-300"}>
            Created: {formatDate(user.createdAt)}
            <br />
            Last Updated: {timeDiff(user.updatedAt)}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
