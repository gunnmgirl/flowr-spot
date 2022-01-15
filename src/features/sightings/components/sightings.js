import React from "react";
import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";

import { getSightings } from "../../../api/queries";

import SightingsItem from "./sightings-item";
import FlowerItem from "../../../components/flower-item";

const Sightings = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(["sightings"], getSightings, {
    getNextPageParam: (lastPage) => {
      return lastPage.pageParams?.next_page;
    },
  });

  if (isLoading) {
    return (
      <Grid
        gap="20px"
        templateColumns="repeat(auto-fill, 280px)"
        templateRows="repeat(auto-fill, 350px)"
        justifyContent="center"
      >
        {[...Array(10)]?.map((x, index) => (
          <FlowerItem isLoading={true} key={index} />
        ))}
      </Grid>
    );
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Flex pb="30px" direction="column">
      <Flex align="center" justify="space-evenly">
        <Box textAlign="center">
          <Heading opacity="0.8">Sighting List</Heading>
          <Text my="8px" opacity="0.6">
            Explore between more than 8.427 sightings
          </Text>
        </Box>
      </Flex>
      <Grid
        mt="100px"
        gap="20px"
        templateColumns="repeat(auto-fill, 280px)"
        templateRows="repeat(auto-fill, 500px)"
        justifyContent="center"
      >
        {data?.pages?.map((page, i) =>
          page?.sightings?.map((sighting) => {
            const {
              comments_count,
              description,
              likes_count,
              picture,
              user,
              flower,
              longitude,
              latitude,
              id,
            } = sighting;

            return (
              <SightingsItem
                commentsCount={comments_count}
                description={description}
                likesCount={likes_count}
                picture={picture}
                userName={user?.full_name}
                flowerName={flower?.name}
                longitude={longitude}
                latitude={latitude}
                key={id}
                id={id}
              />
            );
          })
        )}
      </Grid>
      <Button
        mt="30px"
        width="fit-content"
        colorScheme="purple"
        alignSelf="center"
        onClick={() => fetchNextPage()}
        isDisabled={!hasNextPage || isFetchingNextPage}
        isLoading={isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </Button>
    </Flex>
  );
};

export default Sightings;
