import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "120%",
  },
}));

const SearchBar = () => {
  const navigate = useNavigate();
  const [anime, setAnime] = useState("");
  const [response, setResponse] = useState([]);

  // Debounce effect
  useEffect(() => {
    if (!anime) {
      setResponse([]); // Clear results if search box is empty
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/anime?q=${anime}&limit=5`)
        .then((res) => res.json())
        .then((data) => setResponse(data.data || []))
        .catch((err) => console.log(err));
    }, 500); // 500ms debounce delay

    return () => clearTimeout(delayDebounce); // Cleanup function to clear timeout on new keystroke
  }, [anime]);

  const searchAnimeResults = () => {
    navigate(`/search?keyword=${encodeURIComponent(anime)}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchAnimeResults();
    }
  };

  return (
    <Search >
      <SearchIconWrapper>
        <i className="fa-solid fa-magnifying-glass"></i>
      </SearchIconWrapper>
      <StyledInputBase 
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={anime}
        onChange={(e) => setAnime(e.target.value)} // Only update state
        onKeyDown={handleKeyDown}
      />
      {/* Show search results below input */}
      {response.length > 0 && (
        <ul className="search-results">
          {response.map((item) => (
            <li className="result-titles" key={item.mal_id}>{item.title}</li>
          ))}
        </ul>
      )}
    </Search>
  );
};

export default SearchBar;
