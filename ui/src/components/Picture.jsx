import React, { useState } from "react";
import { TrashIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Picture = (props) => {
  const { img, togglePrivacy, deleteAPicture } = props;
  const [showButtons, setShowButtons] = useState(false);

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const privacyIcon =
    img.privacy == "private" ? (
      <EyeIcon className="h-5 w-5" />
    ) : (
      <EyeSlashIcon className="h-5 w-5" />
    );

  return (
    <div
      className="relative rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showButtons && (
        <div className="absolute top-0 left-0 p-2 flex space-x-2 items-center">
          {/* Privacy Toggle Button */}
          <button
            onClick={() => {
              togglePrivacy(img._id, img.privacy);
            }}
            className="text-white rounded-full bg-gray-800 p-2 hover:bg-gray-700 transition duration-300"
          >
            {privacyIcon}
          </button>
          {/* Delete Button */}
          <button
            onClick={() => {
              deleteAPicture(img._id);
            }}
            className="text-white rounded-full bg-red-500 p-2 hover:bg-red-600 transition duration-300"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      )}
      <img src={img.url} alt={img.title} className="rounded-lg" />
    </div>
  );
};

export default Picture;
