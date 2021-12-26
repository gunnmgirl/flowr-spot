import React from "react";
import {
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Button,
  Text,
  useDisclosure,
  Box,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { COMMON_ERROR_MESSAGE, EMAIL_REGEX } from "../../../constants";

import { useMutation } from "react-query";
import { login } from "../../../api/mutations";

import useStore from "../../../store";
import Input from "../../../components/custom-input";
import LoginSuccess from "./login-success";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    ?.matches(EMAIL_REGEX, "Please enter a valid email"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  password: "",
  email: "",
};

const Login = (props) => {
  const { isOpen, onClose } = props;
  const { isLoading, mutate } = useMutation(login);
  const saveToken = useStore((state) => state.saveToken);
  const {
    isOpen: isLoginSuccessOpen,
    onOpen: onLoginSuccessOpen,
    onClose: onLoginSuccessClose,
  } = useDisclosure();
  const toast = useToast({
    variant: "subtle",
    title: "",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues });

  const onLoginSuccess = (data) => {
    saveToken(data?.data?.auth_token);
    handleClose();
    onLoginSuccessOpen();
  };

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: onLoginSuccess,
      onError: (e) => {
        const description = e?.data?.error || COMMON_ERROR_MESSAGE;
        toast({
          description,
          status: "error",
        });
      },
    });
  };

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  return (
    <>
      <Modal
        closeOnEsc={!isLoading}
        closeOnOverlayClick={!isLoading}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius="3px">
          <ModalHeader textAlign="center">Welcome Back</ModalHeader>
          <ModalCloseButton />
          <ModalBody py="30px">
            <VStack spacing="10px">
              <Input
                label="Email Address"
                placeholder="johndoe@gmail.com"
                name="email"
                register={register}
              />
              <Text color="red.400" mt="3px" fontSize="xs">
                {errors?.email?.message}
              </Text>
              <Input
                label="Password"
                placeholder="*****"
                type="password"
                name="password"
                register={register}
              />
              <Text color="red.400" mt="3px" fontSize="xs">
                {errors?.password?.message}
              </Text>
              <Box pt="10px">
                <Button
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  width="100%"
                  colorScheme="purple"
                  onClick={handleSubmit(onSubmit)}
                  size="lg"
                >
                  Login to your Account
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {isLoginSuccessOpen && (
        <LoginSuccess
          isOpen={isLoginSuccessOpen}
          onClose={onLoginSuccessClose}
        />
      )}
    </>
  );
};

export default Login;
