import React from "react";
import {
  Modal,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  Box,
  Button,
} from "@chakra-ui/react";

import useStore from "../../../store";
import AvatarInfo from "../../../components/avatar-info";

const Profile = () => {
  const { first_name, last_name } = useStore((state) => state.user);

  const isProfileOpen = useStore((state) => state.isProfileOpen);
  const toggleProfile = useStore((state) => state.toggleProfile);
  const logout = useStore((state) => state.logout);

  const handleClose = () => {
    toggleProfile();
  };

  return (
    <Modal isOpen={isProfileOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent borderRadius="3px">
        <ModalCloseButton />
        <ModalBody py="30px">
          <VStack align="flex-start" spacing="20px">
            <AvatarInfo name={`${first_name} ${last_name}`} />
            <Box pt="20px">
              <Text mb="4px" opacity="0.7" fontSize="xs">
                First Name
              </Text>
              <Text fontSize="lg">{first_name}</Text>
            </Box>
            <Box>
              <Text mb="4px" opacity="0.7" fontSize="xs">
                Last Name
              </Text>
              <Text fontSize="lg">{last_name}</Text>
            </Box>
            <Button
              onClick={logout}
              px="50px"
              alignSelf="center"
              colorScheme="purple"
            >
              LOGOUT
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Profile;
