import React from "react";
import { HStack, Avatar, Text, Box } from "@chakra-ui/react";

import url from "../icons/profile-holder.svg";

const AvatarInfo = (props) => {
  const { name, onClick = null } = props;
  return (
    <HStack spacing="30px">
      <Avatar cursor="pointer" boxSize="80px" name="user" src={url} />
      <Box>
        <Text fontSize="xl">{name}</Text>
        <Text cursor="pointer" opacity="0.7" fontSize="xs" onClick={onClick}>
          View sightings
        </Text>
      </Box>
    </HStack>
  );
};

export default AvatarInfo;
