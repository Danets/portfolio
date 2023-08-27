import { useState } from "react";
import TextField from "@mui/material/TextField";

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    onSearch(text);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      value={searchText}
      onChange={handleSearchChange}
    />
  );
};

export default Search;
