import React, { useEffect, useState } from "react";
import axios from "axios";

import BaseLayout from "../components/BaseLayout";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";

const LandingPage = () => {
  const [gallery, setGallery] = useState([{}]);

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

  useEffect(() => {
    getPhotos();
    return () => {};
  }, []);

  return (
    <BaseLayout>
      <Hero />
      <Gallery userPhotos={gallery} />
    </BaseLayout>
  );
};

export default LandingPage;
