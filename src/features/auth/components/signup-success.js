import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Button,
  Text,
} from "@chakra-ui/react";

const SignupSuccess = (props) => {
  const { isOpen, onClose, onSignupSuccess } = props;

  const onClick = () => {
    onClose();
    onSignupSuccess();
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
        <ModalHeader textAlign="center">Registration Success</ModalHeader>
        <ModalBody py="30px">
          <Text textAlign="center">
            Congratulations! You have successfully registered to FlowrSpot!
          </Text>
          <Button
            onClick={onClick}
            width="100%"
            variant="outline"
            colorScheme="purple"
            size="lg"
            mt="40px"
          >
            OK
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignupSuccess;
