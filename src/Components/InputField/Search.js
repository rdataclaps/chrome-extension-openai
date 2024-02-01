import { BiSearch } from "react-icons/bi";
import { Input } from "antd";
import React from "react";
const Search = () => (
  <div className="search_bar">
    <Input size="large" placeholder="Search" prefix={<BiSearch className="icons"/>} />
  </div>
);
export default Search;
