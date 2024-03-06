import React from "react";
import { Flex, Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { getPostsByTitleOrContent } from "../../../rest/postRequests";
import { useGlobalContext } from "../../../state/state";

const { Search } = Input;

const searchStyle = {
  width: "60%",
  margin: "0 auto",
};

const SearchPosts: React.FC = () => {
  const { setAllPosts } = useGlobalContext();

  const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
    console.log(info?.source, value);
    const posts = await getPostsByTitleOrContent(value);
    if (posts !== undefined) {
      setAllPosts(posts);
    }
  };

  return (
    <Flex>
      <Search
        placeholder="Search Posts by title or content..."
        size="large"
        style={searchStyle}
        onSearch={onSearch}
        enterButton
      />
    </Flex>
  );
};

export default SearchPosts;
