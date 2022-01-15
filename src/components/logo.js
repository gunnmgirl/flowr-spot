import React from "react";
import { Heading, HStack, Box } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Flower } from "../icons/flower.svg";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <HStack cursor="pointer" onClick={() => navigate("/")}>
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
