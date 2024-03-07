import React, { useState } from "react";
import { Flex, Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const searchStyle = {
  width: "60%",
  margin: "0 auto",
};

const SearchPosts: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();

  const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
    console.log(info?.source, value);
    navigate(`?q=${value}`);
    setValue("");
  };

  return (
    <Flex>
      <Search
        placeholder="Search Posts by title or content..."
        size="large"
        style={searchStyle}
        onSearch={onSearch}
        enterButton
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Flex>
  );
};

export default SearchPosts;
