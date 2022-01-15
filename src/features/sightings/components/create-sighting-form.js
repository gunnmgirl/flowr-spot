import React from "react";
import {
  Flex,
  Heading,
  Box,
  Text,
  Button,
  Collapse,
  useDisclosure,
  Grid,
  FormControl,
  FormErrorMessage,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import SightingMap from "./sighting-map";
import Input from "../../../components/custom-input";
import { useMutation } from "react-query";
import { createSighting } from "../../../api/mutations";

const validationSchema = Yup.object().shape({
  description: Yup.string().required(),
  longitude: Yup.number("Must be a number")
    .required()
    .min(-180, "Min value is -180")
    .max(180, "Max value is 180"),
  latitude: Yup.number("Must be a number")
    .required()
    .min(-90, "Min value is -90")
    .max(90, "Max value is 90"),
  name: Yup.string().required(),
  picture: Yup.mixed().test((value) => value?.[0]?.name),
});

const CreateSightingForm = (props) => {
  const { id } = useParams();
  const { onToggle, isOpen } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast({
    variant: "subtle",
    title: "",
    duration: 5000,
    isClosable: true,
    position: "top",
  });

  const { mutate, isLoading } = useMutation((data) => createSighting(data), {
    onSuccess: () => {
      toast({
        description: "You successfully added new sighting",
        status: "success",
      });
      navigate(`/${id}`);
    },
    onError: (err) => {
      toast({
        description: err?.data?.error?.[0],
        status: "error",
      });
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { flower_id: id },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (var key in data) {
      if (key === "picture") {
        formData.append(key, data[key][0]); // image array
      } else {
        formData.append(key, data[key]);
      }
    }
    mutate(formData);
  };

  const Map = () => {
    const values = useWatch({
      control,
      name: ["latitude", "longitude"],
    });

    return (
      <Collapse animateOpacity in={isOpen}>
        <SightingMap
          latitude={values?.[0] || undefined}
          longitude={values?.[1] || undefined}
        />
      </Collapse>
    );
  };

  return (
    <Flex
      height="100%"
      justifyContent="space-around"
      pb="30px"
      direction="column"
    >
      <Map />
      <Flex py="20px" wrap="wrap" align="center" justify="space-evenly">
        <Box textAlign="center">
          <Heading opacity="0.8">Add New Sighting</Heading>
          <Text my="8px" opacity="0.6">
            Explore between more than 8.427 sightings
          </Text>
        </Box>
        <Button onClick={onToggle}> {isOpen ? "Hide map" : "View map"}</Button>
      </Flex>
      <Grid
        px="20px"
        gap="20px"
        templateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(4,1fr)"]}
      >
        <FormControl isInvalid={errors.name}>
          <Input
            label="Title of the sighting"
            placeholder="Rose"
            name="name"
            register={register}
          />
        </FormControl>
        <FormControl isInvalid={errors.longitude}>
          <Input
            fieldType="number"
            label="Longitude"
            placeholder="11.11"
            name="longitude"
            register={register}
          />
          <FormErrorMessage>{errors.longitude?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.latitude}>
          <Input
            fieldType="number"
            label="Latitude"
            placeholder="22.22"
            name="latitude"
            register={register}
          />
          <FormErrorMessage>{errors.latitude?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.picture}>
          <Input
            label="Image"
            placeholder="Upload image"
            name="picture"
            type="file"
            register={register}
            height="70px"
            color="purple.600"
          />
        </FormControl>
        <GridItem colSpan={[1, 2, 2]}>
          <FormControl isInvalid={errors.description}>
            <Input
              type="textarea"
              label="Description"
              placeholder="Type sighting description"
              name="description"
              register={register}
              height="150px"
            />
          </FormControl>
        </GridItem>
      </Grid>
      <Flex px="20px" my="30px" justifyContent="flex-end">
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          onClick={handleSubmit(onSubmit)}
          colorScheme="purple"
        >
          Create New Sighting
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateSightingForm;
