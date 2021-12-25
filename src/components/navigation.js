import React from "react";
import { Flex, HStack, Text, useDisclosure, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import Signup from "../features/auth/components/signup";
import Logo from "./logo";

const Navigation = () => {
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();
  return (
    <Flex px="28px" py="20px" justify="space-between">
      <Logo />
      <HStack fontSize="sm" spacing="54px">
        <NavLink to="/">Flowers</NavLink>
        <NavLink to="/latest">Latest Sightings</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <Text cursor="pointer" fontWeight="bold" color="purple.500">
          Login
        </Text>
        <Button onClick={onSignupOpen} size="sm" colorScheme="purple">
          New Account
        </Button>
      </HStack>
      <Signup isOpen={isSignupOpen} onClose={onSignupClose} />
    </Flex>
  );
};

export default Navigation;
