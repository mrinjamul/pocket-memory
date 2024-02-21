import React from "react";
import defaultAvatar from "../assets/avatar.png";

const Avatar = (props) => {
  const { src } = props;
  return (
    <img
      src={src || defaultAvatar}
      alt="Avatar"
      className="w-12 h-12 rounded-full"
    />
  );
};

export default Avatar;
