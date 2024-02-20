import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { userAtom, tokenAtom, isAuthenticatedAtom } from "../atoms";
import axios from "axios";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

import BaseLayout from "../components/BaseLayout";
import Mosaic from "../components/Mosaic";

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

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${apiURL}/api/v1/picture/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // After successful upload, refetch pictures
      fetchPictures();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // toggle privacy picture
  const togglePrivacy = async (id, privacy) => {
    try {
      let bodyData =
        privacy == "private" ? { privacy: "public" } : { privacy: "private" };
      const response = await axios.post(
        `${apiURL}/api/v1/picture/${id}`,
        bodyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      // After successful upload, refetch pictures
      fetchPictures();

      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // delete a picture
  const deleteAPicture = async (id) => {
    try {
      const response = await axios.delete(`${apiURL}/api/v1/picture/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      // After successful upload, refetch pictures
      fetchPictures();

      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <BaseLayout>
      <div className="p-4 flex justify-end">
        <label
          htmlFor="upload-input"
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <CloudArrowUpIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Upload Photo
        </label>
        <input
          id="upload-input"
          type="file"
          className="sr-only"
          onChange={handleUpload}
        />
      </div>
      <Mosaic
        userPhotos={gallery}
        togglePrivacy={togglePrivacy}
        deleteAPicture={deleteAPicture}
      />
    </BaseLayout>
  );
};

export default Home;
