import React from "react";
import { HStack, Avatar } from "@chakra-ui/react";

import url from "../icons/profile-holder.svg";

const UserAvatar = () => {
  return (
    <HStack>
      <Avatar boxSize="40px" name="user" src={url} />
    </HStack>
  );
};

export default UserAvatar;
