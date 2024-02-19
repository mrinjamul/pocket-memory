import React from "react";

const Mosaic = (props) => {
  const { userPhotos } = props;

  return (
    <>
      {/* Mosaic Section */}
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="grid grid-cols-5 gap-5">
          {userPhotos.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.title}
              className="rounded-lg"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Mosaic;
