import React from "react";
import { useNavigate } from "react-router-dom";
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
  const { profilePicture, name, sightings, latinName, isLoading, id } = props;
  const navigate = useNavigate();

  const gotoAddSighting = () => {
    navigate(`/sightings/${id}/new`);
  };

  return (
    <Skeleton isLoaded={!isLoading}>
      <Box backgroundSize="cover" bgImage={flowerBg} height="350px">
        <Grid
          gap="50px"
          alignItems="flex-end"
          templateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "300px 2fr 1fr"]}
          height="350px"
          backgroundImage="linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.4) 100%)"
        >
          <GridItem position="relative">
            <Image
              borderRadius="3px"
              top={["0px", "0px", "-300px"]}
              left={[null, null, "20px"]}
              right={["10px", "10px", "0px"]}
              position="absolute"
              height="350px"
              width="280px"
              src={profilePicture}
              fallbackSrc={noImage}
            />
          </GridItem>
          <GridItem pl={["10px", "10px", "0px"]} py="20px" color="white">
            <Button
              mb="20px"
              size="xs"
              colorScheme="black"
              bg="rgba(0, 0, 0, 0.2)"
            >{`${sightings} sightings`}</Button>
            <Box position="relative">
              <Heading>{name}</Heading>
              <Text fontSize="sm">{latinName}</Text>
            </Box>
          </GridItem>
          <GridItem pl={["10px", "10px", "0px"]} py="20px">
            <Button onClick={gotoAddSighting} colorScheme="purple">
              + Add New Sighting
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </Skeleton>
  );
};

export default FlowerDetailHeader;
