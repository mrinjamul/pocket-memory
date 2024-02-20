import React from "react";
import Picture from "./Picture";

const Mosaic = (props) => {
  const { userPhotos, togglePrivacy, deleteAPicture } = props;

  return (
    <>
      {/* Mosaic Section */}
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {userPhotos.map((img, index) => (
            <Picture
              key={index}
              img={img}
              togglePrivacy={togglePrivacy}
              deleteAPicture={deleteAPicture}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Mosaic;
