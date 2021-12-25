import React from "react";
import { Circle } from "@chakra-ui/layout";

import { ReactComponent as Star } from "../icons/star.svg";

const Favorite = (props) => {
  const { favorite } = props;
  return (
    <Circle
      cursor="pointer"
      height="30px"
      width="30px"
      padding="4px"
      background={favorite ? "pink.500" : "white"}
      fill={favorite ? "white" : "gray.300"}
    >
      <Star />
    </Circle>
  );
};

export default Favorite;
