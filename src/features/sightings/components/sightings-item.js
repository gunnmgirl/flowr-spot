import React from "react";
import { Avatar, Box, Button, Center, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import url from "../../../icons/profile-holder.svg";
import { ReactComponent as Comments } from "../../../icons/message-circle.svg";
import { ReactComponent as Likes } from "../../../icons/heart.svg";
import { ReactComponent as Pin } from "../../../icons/map-pin.svg";

const SightingsItem = (props) => {
  const navigate = useNavigate();
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
  } = props;

  const gotoSightingDetail = () => {
    navigate(`/sightings/${id}`, {
      state: {
        commentsCount,
        description,
        likesCount,
        picture,
        userName,
        flowerName,
        longitude,
        latitude,
        id,
      },
    });
  };

  return (
    <Box
      cursor="pointer"
      onClick={gotoSightingDetail}
      boxShadow="0px 15px 30px rgba(0, 0, 0, 0.05)"
    >
      <Box
        borderRadius="3px 3px 0px 0px"
        background={`url(${picture})`}
        backgroundSize="cover"
        boxSize="280px"
        position="relative"
      >
        <Button
          color="purple.600"
          background="#E9D8FD"
          position="absolute"
          top="20px"
          left="20px"
          size="xs"
          leftIcon={
            <Center fill="#ED8936" stroke="purple.500">
              <Pin />
            </Center>
          }
        >{`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`}</Button>
      </Box>
      <Box padding="20px">
        <HStack spacing="15px">
          <Avatar src={url} />
          <Box>
            <Text>{flowerName}</Text>
            <Text fontSize="xs" opacity="0.7">{`by ${userName}`}</Text>
          </Box>
        </HStack>
        <Text
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          py="20px"
          borderBottom="1px solid #E8E9ED"
          opacity="0.7"
        >
          {description}
        </Text>
        <HStack spacing="12px" mt="20px">
          <Center fill="#DADADA">
            <Comments />
          </Center>
          <Text opacity="0.7" fontSize="xs">{`${commentsCount} Comments`}</Text>
          <Center fill="#DADADA">
            <Likes />
          </Center>
          <Text opacity="0.7" fontSize="xs">{`${likesCount} Favorites`}</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default SightingsItem;
