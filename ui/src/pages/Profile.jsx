import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom, tokenAtom, isAuthenticatedAtom } from "../atoms";
import axios from "axios";

import BaseLayout from "../components/BaseLayout";
import Gallery from "../components/Gallery";
import UserProfile from "../components/UserProfile";
import NotFound from "./NotFound";

const Profile = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const token = useRecoilValue(tokenAtom);
  const user = useRecoilValue(userAtom);
  const [userData, setUserData] = useState({
    name: "",
    username: "username",
    bio: "",
  });
  const [gallery, setGallery] = useState([]);

  const apiURL = import.meta.env.VITE_APP_APIURL || "http://localhost:4000";

  const { username } = useParams();

  // Get Profile info
  const getProfile = async (username) => {
    try {
      const headers = token
        ? `{headers: { Authorization: "Bearer token" }}`
        : "";
      const response = await axios.get(
        `${apiURL}/api/v1/user/${username}`,
        headers
      );
      let userinfo = response.data.data;
      userinfo.avatar = userinfo?.avatar
        ? `http://${userinfo.avatar}`
        : userinfo?.avatar;
      setUserData(userinfo);
    } catch (err) {
      // console.log(err);
      setUserData({ username: "" });
    }
  };
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

  const fetchPublicPictures = async (username) => {
    const response = await axios({
      method: "get",
      url: `${apiURL}/api/v1/picture/u/${username}`,
    });
    const pictures = response.data.data;
    setGallery(pictures);
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${apiURL}/api/v1/avatar/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle successful upload
      console.log("Avatar uploaded successfully:", response.data);
      getProfile(username); // You may want to update the user's avatar URL in the state or re-fetch user data
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  useEffect(() => {
    getProfile(username);
    if (user && username == user.username) {
      fetchPictures();
    } else {
      fetchPublicPictures(username);
    }
  }, [username, user]);

  if (userData && userData.username == "") {
    return <NotFound />;
  }

  return (
    <BaseLayout>
      <UserProfile user={userData} handleAvatarUpload={handleAvatarUpload} />
      <Gallery userPhotos={gallery} />
    </BaseLayout>
  );
};

export default Profile;
