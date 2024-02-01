import React, { useState } from 'react';

const SearchInput = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  let timeoutId;

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
    //   handleSearch(value);
    props.onSearch(value);
    }, 500);
  };

  return (
    <div style={{marginBottom: '10px'}}>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;