import React from "react";
import { Heading, HStack, Box } from "@chakra-ui/layout";

import { ReactComponent as Flower } from "../icons/flower.svg";

const Logo = () => {
  return (
    <HStack>
      <Box fill="purple.400">
        <Flower />
      </Box>
      <Heading color="purple.400" fontSize="lg">
        FlowrSpot
      </Heading>
    </HStack>
  );
};

export default Logo;
