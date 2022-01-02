import React from "react";
import { Grid, Button, Flex } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";

import { getFlowers } from "../../../api/queries";

import FlowerItem from "../../../components/flower-item";

const Home = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery("flowers", getFlowers, {
    getNextPageParam: (lastPage, pages) => {
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
    <Flex py="30px" direction="column">
      <Grid
        gap="20px"
        templateColumns="repeat(auto-fill, 280px)"
        templateRows="repeat(auto-fill, 350px)"
        justifyContent="center"
      >
        {data?.pages?.map((page, i) =>
          page?.flowers?.map((flower) => (
            <FlowerItem
              key={flower?.id}
              favoriteId={flower?.sightingId}
              flower={flower}
            />
          ))
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

export default Home;
