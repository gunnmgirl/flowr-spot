import React from "react";
import { Box, HStack, Avatar, Text } from "@chakra-ui/react";

import url from "../../../icons/profile-holder.svg";

const CommentItem = (props) => {
  const { user_full_name, content, flower_name } = props;
  return (
    <Box
      borderBottom="1px solid"
      borderColor="rgba(0,0,0,0.1)"
      py="25px"
      width="100%"
    >
      <HStack mb="20px" spacing="15px">
        <Avatar src={url} />
        <Box>
          <Text>{flower_name}</Text>
          <Text fontSize="xs" opacity="0.7">{`by ${user_full_name}`}</Text>
        </Box>
      </HStack>
      <Text opacity="0.7">{content}</Text>
    </Box>
  );
};

export default CommentItem;
