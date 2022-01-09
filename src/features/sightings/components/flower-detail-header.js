import React from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Skeleton,
} from "@chakra-ui/react";

import flowerBg from "../../../icons/flower-bg.svg";
import noImage from "../../../icons/no-image.png";

const FlowerDetailHeader = (props) => {
  const { profilePicture, name, sightings, latinName, isLoading } = props;
  return (
    <Skeleton isLoaded={!isLoading}>
      <Box backgroundSize="cover" bgImage={flowerBg} height="350px">
        <Grid
          gap="50px"
          alignItems="flex-end"
          templateColumns="300px 2fr 1fr"
          height="350px"
          backgroundImage="linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.4) 100%)"
        >
          <GridItem position="relative">
            <Image
              borderRadius="3px"
              top="-300px"
              left="20px"
              position="absolute"
              height="350px"
              width="280px"
              src={profilePicture}
              fallbackSrc={noImage}
            />
          </GridItem>
          <GridItem py="20px" color="white">
            <Button
              mb="20px"
              size="xs"
              colorScheme="black"
              bg="rgba(0, 0, 0, 0.2)"
            >{`${sightings} sightings`}</Button>
            <Heading>{name}</Heading>
            <Text fontSize="sm">{latinName}</Text>
          </GridItem>
          <GridItem py="20px">
            <Button colorScheme="purple">+ Add New Sighting</Button>
          </GridItem>
        </Grid>
        <Text></Text>
      </Box>
    </Skeleton>
  );
};

export default FlowerDetailHeader;