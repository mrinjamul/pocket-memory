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
    username: "",
    bio: "",
  });
  const [gallery, setGallery] = useState([]);

  const apiURL = import.meta.env.VITE_APP_APIURL || "http://localhost:4000";

  const { username } = useParams();

  // Get Profile info
  const getProfile = async (username) => {
    try {
      const response = await axios.get(`${apiURL}/api/v1/user/${username}`);
      const userinfo = response.data.data;
      setUserData(userinfo);
    } catch (err) {
      // console.log(err);
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

  useEffect(() => {
    if (user && username == user.username) {
      setUserData(user);
      fetchPictures();
    } else {
      getProfile(username);
      fetchPublicPictures(username);
    }
  }, [username, user]);

  if (user.username == "") {
    return <NotFound />;
  }

  return (
    <BaseLayout>
      <UserProfile user={userData} />
      <Gallery userPhotos={gallery} />
    </BaseLayout>
  );
};

export default Profile;
