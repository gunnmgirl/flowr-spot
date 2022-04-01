import React from "react";
import { Flex, Stack, Text, useDisclosure, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useWindowSize } from "react-use";

import useStore from "../store";

import Signup from "../features/auth/components/signup";
import Logo from "./logo";
import Login from "../features/auth/components/login";
import UserAvatar from "./user-avatar";
import NavigationMobile from "./navigation-mobile";

const Navigation = () => {
  const isAuth = useStore((state) => state.isAuth);
  const { width } = useWindowSize();
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
      <Stack
        align="center"
        direction={["column", "row"]}
        fontSize="sm"
        spacing="54px"
      >
        {width < 550 ? (
          <NavigationMobile />
        ) : (
          <>
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive ? { color: "purple" } : undefined
              }
            >
              Flowers
            </NavLink>
            <NavLink
              to="/sightings"
              style={({ isActive }) =>
                isActive ? { color: "purple" } : undefined
              }
              data-cy="sightings-button"
            >
              Latest Sightings
            </NavLink>
            <NavLink
              to="/favorites"
              style={({ isActive }) =>
                isActive ? { color: "purple" } : undefined
              }
            >
              Favorites
            </NavLink>
          </>
        )}
        {isAuth ? (
          <UserAvatar />
        ) : (
          <>
            <Text
              onClick={onLoginOpen}
              cursor="pointer"
              fontWeight="bold"
              color="purple.500"
              data-cy="login-button"
            >
              Login
            </Text>
            <Button
              data-cy="signup-button"
              onClick={onSignupOpen}
              size="sm"
              colorScheme="purple"
            >
              New Account
            </Button>
          </>
        )}
      </Stack>
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
