import { Grid } from "@chakra-ui/layout";
import React from "react";
import { useQuery } from "react-query";

import { getFlowers } from "../../../api/queries/flowers";
import FlowerItem from "../../../components/flower-item";

const Home = () => {
  const { isLoading, isError, data, error } = useQuery("flowers", getFlowers);

  if (isLoading) {
    return <span>Loading...</span>;
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
      {data?.data?.flowers?.map((flower) => (
        <FlowerItem flower={flower} />
      ))}
    </Grid>
  );
};

export default Home;
