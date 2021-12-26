import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Button,
  Text,
  Grid,
} from "@chakra-ui/react";

const LoginSuccess = (props) => {
  const { isOpen, onClose } = props;

  const handleProfile = () => {};

  const handleOnClick = () => {
    onClose();
  };

  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent borderRadius="3px">
        <ModalHeader textAlign="center">Login Success</ModalHeader>
        <ModalBody py="30px">
          <Text textAlign="center">
            Congratulations! You have successfully logged into FlowrSpot!
          </Text>
          <Grid mt="40px" gap="8px" templateColumns="1fr 1fr">
            <Button
              width="100%"
              variant="outline"
              colorScheme="purple"
              size="lg"
              onClick={handleOnClick}
            >
              OK
            </Button>
            <Button
              onClick={handleProfile}
              width="100%"
              colorScheme="purple"
              size="lg"
            >
              PROFILE
            </Button>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginSuccess;
