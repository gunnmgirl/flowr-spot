import { Flex, HStack } from "@chakra-ui/layout";
import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "./logo";

const Navigation = () => {
  return (
    <Flex px="28px" py="20px" justify="space-between">
      <Logo />
      <HStack fontSize="sm" spacing="54px">
        <NavLink to="/">Flowers</NavLink>
        <NavLink to="/latest">Latest Sightings</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </HStack>
    </Flex>
  );
};

export default Navigation;
