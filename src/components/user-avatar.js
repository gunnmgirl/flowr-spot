import React from "react";
import { Avatar } from "@chakra-ui/react";

import url from "../icons/profile-holder.svg";
import useStore from "../store";
import Profile from "../features/profile/components/profile";

const UserAvatar = () => {
  const toggleProfile = useStore((state) => state.toggleProfile);
  const isProfileOpen = useStore((state) => state.isProfileOpen);

  return (
    <>
      <Avatar
        cursor="pointer"
        onClick={toggleProfile}
        boxSize="40px"
        name="user"
        src={url}
      />
      {isProfileOpen && <Profile />}
    </>
  );
};

export default UserAvatar;
