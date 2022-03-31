import React from "react";
import { Grid } from "@chakra-ui/layout";
import { useQuery } from "react-query";

import { getFlowers } from "../../api/queries";

import FlowerItem from "../../components/flower-item";

const Landing = () => {
  const { isLoading, isError, data, error } = useQuery("flowers", getFlowers);

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
    <Grid
      gap="20px"
      templateColumns="repeat(auto-fill, 280px)"
      templateRows="repeat(auto-fill, 350px)"
      justifyContent="center"
    >
      {data.flowers.map((flower) => (
        <FlowerItem key={flower?.id} flower={flower} />
      ))}
    </Grid>
  );
};

export default Landing;
