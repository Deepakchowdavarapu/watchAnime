import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("keyword");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=5`)
        .then((res) => res.json())
        .then((data) => setResults(data.data))
        .catch((error) => console.error(error));
    }
  }, [query]);

  return (
    <div>
      <h2>Search Results for: {query}</h2>
      <ul>
        {results.map((anime) => (
          <li key={anime.mal_id}>
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            {anime.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
