import React from "react";

const Search = (props) => {
  const { searchQuery } = props.location.state;
  return (
    <div>
      <h1>{searchQuery}</h1>
    </div>
  );
};

export default Search;
