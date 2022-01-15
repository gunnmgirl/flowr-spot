import React from "react";
import { Box, Text, VStack, Button, Skeleton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import useStore from "../store";
import Favorite from "./favorite";

const FlowerItem = (props) => {
  const navigate = useNavigate();
  const {
    flower = {},
    isLoading,
    favoriteId = "",
    shouldRemoveFavorite = false,
    hasQuery = false,
  } = props;
  const {
    favorite,
    latin_name = "",
    name = "",
    id = null,
    profile_picture = "",
    sightings = "",
  } = flower;
  const isAuth = useStore((state) => state.isAuth);

  const gotoFlowerDetail = () => {
    if (sightings) {
      navigate(`/${id}`);
    } else navigate(`/sightings/${id}/new`);
  };

  return (
    <Skeleton isLoaded={!isLoading}>
      <Box
        borderRadius="3px"
        position="relative"
        height="350px"
        width="280px"
        background={`url(${profile_picture})`}
        backgroundSize="cover"
      >
        {isAuth && (
          <Box zIndex="1" top="20px" right="20px" position="absolute">
            <Favorite
              shouldRemoveFavorite={shouldRemoveFavorite}
              favoriteId={favoriteId}
              id={id}
              favorite={favorite}
              hasQuery={hasQuery}
            />
          </Box>
        )}
        <Box
          top="0"
          position="absolute"
          height="350px"
          width="280px"
          backgroundImage="linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.7) 89.5%)"
        />
        <VStack
          spacing="0"
          width="100%"
          position="absolute"
          color="white"
          bottom="20px"
        >
          <Text fontSize="xl">{name}</Text>
          <Text pb="16px" opacity="0.7" fontSize="xs">
            {latin_name}
          </Text>
          <Button
            onClick={gotoFlowerDetail}
            colorScheme={favorite ? "pink" : "black"}
          >{`${sightings} sightings`}</Button>
        </VStack>
      </Box>
    </Skeleton>
  );
};

export default FlowerItem;
