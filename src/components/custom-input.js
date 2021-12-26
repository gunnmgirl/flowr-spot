import React from "react";
import { Input, Box, Text } from "@chakra-ui/react";

const CustomInput = (props) => {
  const { register, name, ...rest } = props;

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
      <Input
        backgroundColor="gray.50"
        fontSize="sm"
        borderRadius="3px"
        pb="11px"
        pt="34px"
        {...register?.(name)}
        {...rest}
      />
    </Box>
  );
};

export default CustomInput;
