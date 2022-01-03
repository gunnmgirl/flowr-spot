import React from "react";
import { Button, Flex, Grid } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";

import { getFlower } from "../../../api/queries";

import FlowerDetailHeader from "./flower-detail-header";
import SightingsItem from "./sightings-item";

const FlowerDetail = () => {
  const { id } = useParams();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(["flower", id], (data) => getFlower({ ...data, id }), {
    getNextPageParam: (lastPage) => {
      return lastPage.pageParams?.next_page;
    },
  });

  const findSightings = () => {
    let sum = 0;
    data?.pages?.map((page) => {
      return (sum = page?.sightings?.length + sum);
    });
    return sum || 0;
  };

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Flex pb="30px" direction="column">
      <FlowerDetailHeader
        isLoading={isLoading}
        sightings={findSightings()}
        profilePicture={
          data?.pages?.[0]?.sightings?.[0]?.flower?.profile_picture
        }
        latinName={data?.pages?.[0]?.sightings?.[0]?.flower?.latin_name}
        name={data?.pages?.[0]?.sightings?.[0]?.flower?.name}
      />
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

export default FlowerDetail;
