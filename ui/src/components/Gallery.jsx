import React from "react";

const Gallery = (props) => {
  const { userPhotos } = props;

  return (
    <>
      {/* Gallery Section */}
      <div className="flex justify-center items-center p-8">
        <div className="grid grid-cols-4 gap-4">
          {userPhotos.length != 0 &&
            userPhotos.map((img, index) => (
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

export default Gallery;
