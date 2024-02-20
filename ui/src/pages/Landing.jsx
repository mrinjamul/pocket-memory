import React, { useEffect, useState } from "react";
import axios from "axios";

import BaseLayout from "../components/BaseLayout";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";

const LandingPage = () => {
  const [gallery, setGallery] = useState([]);

  const apiURL = import.meta.env.VITE_APP_APIURL || "http://localhost:4000";

  // get photos from the server
  const getPhotos = async () => {
    try {
      const response = await axios.get(apiURL + "/api/v1/picture");
      const pictures = response.data.data;
      setGallery(pictures);
    } catch (error) {
      console.error("error while fetching images:", error);
    }
  };

  // Function to shuffle array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to get random 8 pictures from the gallery
  const getRandomPictures = () => {
    const shuffledGallery = shuffleArray([...gallery]); // Shuffle the gallery array
    return shuffledGallery.slice(0, 8); // Return the first 8 elements
  };

  useEffect(() => {
    getPhotos(); // Fetch photos when the component mounts
  }, []);

  return (
    <BaseLayout>
      <Hero />
      <Gallery userPhotos={getRandomPictures()} />
    </BaseLayout>
  );
};

export default LandingPage;
