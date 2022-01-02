import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Center,
  Input,
  InputGroup,
  InputRightAddon,
  Flex,
} from "@chakra-ui/react";

import { ReactComponent as SearchIcon } from "../../../icons/search.svg";
import { ReactComponent as X } from "../../../icons/x.svg";

const Search = (props) => {
  const navigate = useNavigate();
  const { defaultValue = "" } = props;
  const [search, setSearch] = React.useState(defaultValue);

  const handleClick = (query) => {
    setSearch(query);
    return navigate(`${query ? `?query=${query}` : ""}`);
  };

  return (
    <Flex justifyContent="center" width="100%" alignItems="center">
      <InputGroup width="50%">
        <Input
          value={search}
          placeholder="Looking for something specific?"
          fontSize="lg"
          border="0"
          onChange={(e) => setSearch(e?.target?.value || "")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick(search);
            }
          }}
        />
        <InputRightAddon
          background="transparent"
          border="0"
          children={
            defaultValue ? (
              <Center onClick={() => handleClick("")} stroke="purple.500">
                <X />
              </Center>
            ) : (
              <Center onClick={() => handleClick(search)} stroke="purple.500">
                <SearchIcon />
              </Center>
            )
          }
        />
      </InputGroup>
    </Flex>
  );
};

export default Search;
