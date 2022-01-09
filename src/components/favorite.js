import React from "react";
import { Circle, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

import { favoriteFlower, unfavoriteFlower } from "../api/mutations";

import { ReactComponent as Star } from "../icons/star.svg";

const Favorite = (props) => {
  const { favorite, id, favoriteId, shouldRemoveFavorite, hasQuery } = props;
  const location = useLocation();
  const { query } = queryString.parse(location.search);

  const queryClient = useQueryClient();
  const toast = useToast({
    variant: "subtle",
    title: "",
    duration: 5000,
    isClosable: true,
    position: "top",
  });

  const { mutate } = useMutation(() => favoriteFlower(id), {
    onSuccess: (data) => {
      const previousFlowers = queryClient.getQueryData(["flowers", query]);
      const newState = previousFlowers?.pages?.map((page) => {
        return {
          ...page,
          flowers: page?.flowers?.map((flower) => {
            if (flower?.id === id) {
              flower = { ...flower, sightingId: data, favorite: true };
            }
            return flower;
          }),
        };
      });
      queryClient.setQueryData(["flowers", query], (old) => {
        return { ...old, pages: newState };
      });
      return { previousFlowers };
    },
    onError: (err, id, context) => {
      toast({
        description: err?.data?.error?.[0],
        status: "error",
      });
      queryClient.setQueryData(["flowers", query], context.previousFlowers);
    },
  });

  const { mutate: unfavorite } = useMutation(
    () => unfavoriteFlower(id, favoriteId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(
          hasQuery ? ["flowers", query] : "flowers"
        );
        const previousFlowers = queryClient.getQueryData(
          hasQuery ? ["flowers", query] : "flowers"
        );
        let newState = [];
        if (shouldRemoveFavorite) {
          newState = previousFlowers?.pages?.map((page) => {
            return {
              ...page,
              flowers: page?.flowers?.filter((flower) => {
                return flower?.id !== favoriteId;
              }),
            };
          });
        } else {
          newState = previousFlowers?.pages?.map((page) => {
            return {
              ...page,
              flowers: page?.flowers?.map((flower) => {
                if (flower?.sightingId === favoriteId) {
                  flower = { ...flower, favorite: false };
                }
                return flower;
              }),
            };
          });
        }
        queryClient.setQueryData(
          hasQuery ? ["flowers", query] : "flowers",
          (old) => {
            return { ...old, pages: newState };
          }
        );
        return { previousFlowers };
      },
      onError: (err, id, context) => {
        toast({
          description: err?.data?.error,
          status: "error",
        });
        queryClient.setQueryData(
          hasQuery ? ["flowers", query] : "flowers",
          context.previousFlowers
        );
      },
    }
  );

  const handleFavorite = () => {
    if (favorite) {
      unfavorite();
    } else {
      mutate();
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
