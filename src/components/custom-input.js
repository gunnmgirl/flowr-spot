import React from "react";
import {
  Input,
  Box,
  Text,
  NumberInput,
  NumberInputField,
  Textarea,
} from "@chakra-ui/react";

const CustomInput = (props) => {
  const { register, name, fieldType, ...rest } = props;

  const getField = () => {
    switch (fieldType) {
      case "number":
        return (
          <NumberInput>
            <NumberInputField
              {...register?.(name, { valueAsNumber: true })}
              backgroundColor="gray.50"
              fontSize="sm"
              borderRadius="3px"
              pb="11px"
              pt="34px"
              {...rest}
            />
          </NumberInput>
        );
      case "textarea":
        return (
          <Textarea
            {...register?.(name)}
            backgroundColor="gray.50"
            fontSize="sm"
            borderRadius="3px"
            resize="none"
            {...rest}
          />
        );
      default:
        return (
          <Input
            backgroundColor="gray.50"
            fontSize="sm"
            borderRadius="3px"
            pb="11px"
            pt="34px"
            {...register?.(name)}
            {...rest}
          />
        );
    }
  };

  return (
    <Box width="100%" position="relative">
      <Text
        fontSize="xs"
        pt="8px"
        pb="4px"
        pl="4"
        position="absolute"
        opacity="0.7"
        zIndex={2}
      >
        {props?.label || ""}
      </Text>
      {getField()}
    </Box>
  );
};

export default CustomInput;
