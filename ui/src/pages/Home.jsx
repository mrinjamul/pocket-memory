import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { userAtom, tokenAtom, isAuthenticatedAtom } from "../atoms";

import BaseLayout from "../components/BaseLayout";
import Mosaic from "../components/Mosaic";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const token = useRecoilValue(tokenAtom);
  const user = useRecoilValue(userAtom);

  const apiURL = import.meta.env.VITE_APP_APIURL || "http://localhost:4000";

  const fetchPictures = async () => {
    const response = await axios({
      method: "get",
      url: `${apiURL}/api/v1/picture`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const pictures = response.data.data;
    setGallery(pictures);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPictures();
    } else {
      navigate("/");
    }
    return () => {};
  }, [isAuthenticated, token]);

  return (
    <BaseLayout>
      <div className="relative">
        <label
          htmlFor="upload-input"
          className="absolute top-0 right-0 mt-4 mr-4 text-white bg-blue-500 px-4 py-2 rounded cursor-pointer"
        >
          Upload Photo
        </label>
        <input
          id="upload-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={() => {}}
        />
      </div>
      <Mosaic userPhotos={gallery} />
    </BaseLayout>
  );
};

export default Home;
