import React from "react";
import { Flex, HStack, Text, useDisclosure, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import useStore from "../store";

import Signup from "../features/auth/components/signup";
import Logo from "./logo";
import Login from "../features/auth/components/login";
import UserAvatar from "./user-avatar";

const Navigation = () => {
  const isAuth = useStore((state) => state.isAuth);
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  return (
    <Flex px="28px" py="20px" justify="space-between">
      <Logo />
      <HStack fontSize="sm" spacing="54px">
        <NavLink to="/">Flowers</NavLink>
        <NavLink to="/latest">Latest Sightings</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        {isAuth ? (
          <UserAvatar />
        ) : (
          <>
            <Text
              onClick={onLoginOpen}
              cursor="pointer"
              fontWeight="bold"
              color="purple.500"
            >
              Login
            </Text>
            <Button onClick={onSignupOpen} size="sm" colorScheme="purple">
              New Account
            </Button>
          </>
        )}
      </HStack>
      <Signup
        onSignupSuccess={onLoginOpen}
        isOpen={isSignupOpen}
        onClose={onSignupClose}
      />
      <Login isOpen={isLoginOpen} onClose={onLoginClose} />
    </Flex>
  );
};

export default Navigation;
