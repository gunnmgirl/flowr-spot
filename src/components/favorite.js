import React from "react";
import { Circle, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";

import { favoriteFlower, unfavoriteFlower } from "../api/mutations";

import useStore from "../store";

import { ReactComponent as Star } from "../icons/star.svg";

const Favorite = (props) => {
  const { favorite, id } = props;
  const { id: userId } = useStore((state) => state.user);
  const queryClient = useQueryClient();
  const toast = useToast({
    variant: "subtle",
    title: "",
    duration: 5000,
    isClosable: true,
    position: "top",
  });

  const { mutate } = useMutation(favoriteFlower, {
    onMutate: async (id) => {
      await queryClient.cancelQueries("flowers");
      const previousFlowers = queryClient.getQueryData("flowers");
      const newState = previousFlowers?.pages?.map((page) => {
        return {
          ...page,
          flowers: page?.flowers?.map((flower) => {
            if (flower?.id === id) {
              flower = { ...flower, favorite: true };
            }
            return flower;
          }),
        };
      });
      queryClient.setQueryData("flowers", (old) => {
        return { ...old, pages: newState };
      });
      return { previousFlowers };
    },
    onError: (err, id, context) => {
      toast({
        description: err?.data?.error?.[0],
        status: "error",
      });
      queryClient.setQueryData("flowers", context.previousFlowers);
    },
  });

  const { mutate: unfavorite } = useMutation(
    () => unfavoriteFlower(id, userId),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries("flowers");
        const previousFlowers = queryClient.getQueryData("flowers");
        const newState = previousFlowers?.pages?.map((page) => {
          return {
            ...page,
            flowers: page?.flowers?.map((flower) => {
              if (flower?.id === id) {
                flower = { ...flower, favorite: false };
              }
              return flower;
            }),
          };
        });
        queryClient.setQueryData("flowers", (old) => {
          return { ...old, pages: newState };
        });
        return { previousFlowers };
      },
      onError: (err, id, context) => {
        toast({
          description: err?.data?.error,
          status: "error",
        });
        queryClient.setQueryData("flowers", context.previousFlowers);
      },
    }
  );

  const handleFavorite = () => {
    if (favorite) {
      unfavorite(id);
    } else {
      mutate(id);
    }
  };

  return (
    <Circle
      onClick={handleFavorite}
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
