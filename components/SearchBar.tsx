import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const SearchBar = ({ onSearch }: { onSearch: (q: string) => void }) => (
  <form>
    <TextField
      className="text"
      onInput={(e: any) => {
        onSearch(e.target?.value);
      }}
      sx={{
        width: "100%",
      }}
      variant="outlined"
      placeholder="Search..."
      size="small"
      InputProps={{
        endAdornment: <SearchIcon />,
      }}
    />
  </form>
);

export default SearchBar;
