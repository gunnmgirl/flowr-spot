import React from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import {
  Box,
  Skeleton,
  VStack,
  Button,
  Textarea,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { getComments } from "../../../api/queries";
import CommentItem from "./comment-item";
import { useForm } from "react-hook-form";
import { createComment } from "../../../api/mutations";

const Comments = (props) => {
  const { id: sighting_id, flower_name } = props;
  const queryClient = useQueryClient();
  const toast = useToast({
    variant: "subtle",
    title: "",
    duration: 5000,
    isClosable: true,
    position: "top",
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(
    ["comments", sighting_id],
    (data) => getComments({ ...data, sighting_id }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.pageParams?.next_page;
      },
    }
  );

  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation(({ id, values }) => createComment(id, values), {
    onSuccess: () => {
      reset({ content: "" });
      toast({
        description: "Successfully added a comment!",
        status: "success",
      });
      queryClient.invalidateQueries(["comments"]);
    },

    onError: (err) => {
      toast({
        description: err?.data?.error?.[0],
        status: "error",
      });
      queryClient.invalidateQueries(["comments", sighting_id]);
    },
  });

  const onSubmit = (values) => {
    mutation.mutate({ id: sighting_id, values });
  };

  if (isLoading) {
    return (
      <Flex pb="30px" align="center" direction="column" width="100%">
        <Box width="70%" mt="40px">
          {[...Array(10)]?.map((x, index) => (
            <Skeleton mb="30px" isLoaded={false} key={index}>
              <Box height="100px" />
            </Skeleton>
          ))}
        </Box>
      </Flex>
    );
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Flex pb="30px" align="center" direction="column" width="100%">
      <VStack width={["200px", "400px", "600px", "760px"]}>
        <VStack width="100%" mb="30px" spacing="0">
          {data?.pages?.map((page, i) =>
            page?.comments?.map((comment) => {
              const { user_full_name, content, id } = comment;
              return (
                <CommentItem
                  key={id}
                  user_full_name={user_full_name}
                  content={content}
                  flower_name={flower_name}
                />
              );
            })
          )}
        </VStack>
        <Button
          width="fit-content"
          colorScheme="purple"
          alignSelf="center"
          onClick={() => fetchNextPage()}
          isDisabled={!hasNextPage || isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
        <Flex width="100%" direction="column">
          <Textarea
            height="150px"
            resize="none"
            my="20px"
            {...register("content", { required: true })}
            placeholder="Type your comment here"
          ></Textarea>
          <Button
            isLoading={mutation.isLoading}
            isDisabled={mutation.isLoading}
            alignSelf="flex-end"
            colorScheme="purple"
            opacity="0.8"
            onClick={handleSubmit(onSubmit)}
          >
            Publish Comment
          </Button>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Comments;
