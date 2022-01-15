import React from "react";
import {
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Grid,
  GridItem,
  Button,
  Text,
  useDisclosure,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { COMMON_ERROR_MESSAGE, EMAIL_REGEX } from "../../../constants";

import { useMutation } from "react-query";
import { signup } from "../../../api/mutations";

import Input from "../../../components/custom-input";
import SignupSuccess from "./signup-success";

import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/date.css";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  date_of_birth: Yup.string().required("Birth date is required"),
  email: Yup.string()
    .required("Email is required")
    ?.matches(EMAIL_REGEX, "Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Please enter more than 5 characters"),
});

const defaultValues = {
  first_name: "",
  last_name: "",
  date_of_birth: undefined,
  password: "",
  email: "",
};

const Signup = (props) => {
  const { isOpen, onClose, onSignupSuccess } = props;
  const { isLoading, mutate } = useMutation(signup);
  const {
    isOpen: isSignupSuccessOpen,
    onOpen: onSignupSuccessOpen,
    onClose: onSignupSuccessClose,
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
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues });

  const onSubmit = (data) => {
    mutate(
      { ...data },
      {
        onSuccess: () => {
          handleClose();
          onSignupSuccessOpen();
        },
        onError: (e) => {
          const description = e?.data?.error || COMMON_ERROR_MESSAGE;
          toast({
            description,
            status: "error",
          });
        },
      }
    );
  };

  const CustomDatepickerInput = React.forwardRef((props, ref) => {
    const { value, onClick } = props;
    return (
      <Box>
        <Input
          data-cy="signup-datepicker"
          cursor="pointer"
          readOnly
          placeholder="Click to select"
          value={value}
          name="date_of_birth"
          register={register}
          label="Date of Birth"
          onClick={onClick}
        />
        <Text color="red.400" mt="3px" fontSize="xs">
          {errors?.date_of_birth?.message}
        </Text>
      </Box>
    );
  });

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
          <ModalHeader textAlign="center">Create an Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody py="30px">
            <Grid gap="10px" templateColumns="repeat(2,1fr)">
              <Box>
                <Input
                  label="First Name"
                  placeholder="John"
                  name="first_name"
                  register={register}
                  data-cy="signup-first-name-input"
                />
                <Text color="red.400" mt="3px" fontSize="xs">
                  {errors?.first_name?.message}
                </Text>
              </Box>
              <Box>
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  name="last_name"
                  register={register}
                  data-cy="signup-last-name-input"
                />
                <Text color="red.400" mt="3px" fontSize="xs">
                  {errors?.last_name?.message}
                </Text>
              </Box>
              <GridItem colSpan={2}>
                <Controller
                  name="date_of_birth"
                  control={control}
                  defaultValue={undefined}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        showYearDropdown
                        yearDropdownItemNumber={25}
                        scrollableYearDropdown
                        dateFormat="MMMM d, y"
                        selected={
                          field?.value ? new Date(field.value) : undefined
                        }
                        maxDate={new Date()}
                        onChange={(date) => {
                          setValue("date_of_birth", format(date, "MMMM d, y"), {
                            shouldValidate: true,
                          });
                        }}
                        customInput={<CustomDatepickerInput />}
                      />
                    );
                  }}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <Box>
                  <Input
                    label="Email Address"
                    placeholder="johndoe@gmail.com"
                    name="email"
                    register={register}
                    data-cy="signup-email-input"
                  />
                  <Text color="red.400" mt="3px" fontSize="xs">
                    {errors?.email?.message}
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={2}>
                <Box>
                  <Input
                    label="Password"
                    placeholder="*****"
                    type="password"
                    name="password"
                    register={register}
                    data-cy="signup-password-input"
                  />
                  <Text color="red.400" mt="3px" fontSize="xs">
                    {errors?.password?.message}
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={2}>
                <Button
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  width="100%"
                  colorScheme="purple"
                  onClick={handleSubmit(onSubmit)}
                  size="lg"
                  mt="20px"
                  data-cy="signup-submit-button"
                >
                  Create Account
                </Button>
              </GridItem>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SignupSuccess
        isOpen={isSignupSuccessOpen}
        onClose={onSignupSuccessClose}
        onSignupSuccess={onSignupSuccess}
      />
    </>
  );
};

export default Signup;
