import React from 'react';
import { Input, Space } from 'antd';
const { Search: AntSearch } = Input;

const onSearch = (value) => console.log(value);

const CustomSearch = () => (
  <Space direction="vertical">
    <AntSearch
      placeholder="Search"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
  </Space>
);

export default CustomSearch;
