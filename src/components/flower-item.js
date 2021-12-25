import React from "react";
import { Box, Text, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import Favorite from "./favorite";

const FlowerItem = (props) => {
  const { flower } = props;
  const { favorite, latin_name, name, profile_picture, sightings } = flower;
  return (
    <Box
      borderRadius="3px"
      position="relative"
      height="350px"
      width="280px"
      background={`url(${profile_picture})`}
      backgroundSize="cover"
    >
      <Box zIndex="1" top="20px" right="20px" position="absolute">
        <Favorite favorite={favorite} />
      </Box>
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
          colorScheme={favorite ? "pink" : "black"}
        >{`${sightings} sightings`}</Button>
      </VStack>
    </Box>
  );
};

export default FlowerItem;
