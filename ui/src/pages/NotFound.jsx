import React from "react";

import BaseLayout from "../components/BaseLayout";

const NotFound = () => {
  return (
    <BaseLayout>
      {/* Not Found Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className={"text-4xl font-bold text-gray-800 dark:text-white"}>
            404 - Not Found
          </h1>
          <p className={"mt-4 text-gray-600 dark:text-gray-300"}>
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </BaseLayout>
  );
};

export default NotFound;
