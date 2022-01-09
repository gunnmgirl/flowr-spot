import React from "react";
import { Box, Avatar, Text, HStack, Center, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import url from "../../../icons/profile-holder.svg";
import Comments from "./comments";
import { ReactComponent as CommentsIcon } from "../../../icons/message-circle.svg";
import { ReactComponent as Likes } from "../../../icons/heart.svg";

const SightingDetail = (props) => {
  const location = useLocation();
  const {
    commentsCount,
    description,
    likesCount,
    picture,
    userName,
    flowerName,
    longitude,
    latitude,
    id,
  } = location.state;

  return (
    <>
      <Flex
        py="20px"
        align="center"
        direction={["column", "column", "row"]}
        boxShadow="0px 15px 30px rgba(0, 0, 0, 0.05)"
      >
        <Box
          mr={["0", "0", "50px"]}
          mb={["30px", "30px", "0"]}
          borderRadius="3px 3px 0px 0px"
          background={`url(${picture})`}
          backgroundSize="cover"
          boxSize="290px"
        ></Box>
        <Box pb="20px">
          <HStack spacing="15px">
            <Avatar src={url} />
            <Box>
              <Text>{flowerName}</Text>
              <Text fontSize="xs" opacity="0.7">{`by ${userName}`}</Text>
            </Box>
          </HStack>
          <Text py="20px" borderBottom="1px solid #E8E9ED" opacity="0.7">
            {description}
          </Text>
          <HStack spacing="12px" mt="20px">
            <Center fill="#DADADA">
              <CommentsIcon />
            </Center>
            <Text
              opacity="0.7"
              fontSize="xs"
            >{`${commentsCount} Comments`}</Text>
            <Center fill="#DADADA">
              <Likes />
            </Center>
            <Text opacity="0.7" fontSize="xs">{`${likesCount} Favorites`}</Text>
          </HStack>
        </Box>
      </Flex>
      <Comments
        longitude={longitude}
        latitude={latitude}
        flower_name={flowerName}
        id={id}
      />
    </>
  );
};

export default SightingDetail;
