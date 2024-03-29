import React from "react";

const Gallery = (props) => {
  const { userPhotos } = props;

  return (
    <>
      {/* Gallery Section */}
      <div className="flex justify-center items-center p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {userPhotos.length != 0 &&
            userPhotos.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.title}
                className="w-32 h-32 rounded-md object-cover"
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
