import useGetSavedAnimes from "../../Hooks/useGetSavedAnimes";
import "./List.css";

const List = () => {
  const { savedAnimes, isLoading, error } = useGetSavedAnimes();

  if (isLoading)
    return (
      <div className="loading-container">
        <p>Loading saved animes...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );

  if (!savedAnimes || savedAnimes.length === 0)
    return (
      <div className="empty-container">
        <p>No Favourites Added Yet</p>
      </div>
    );

  return (
    <div className="list">
      <h2>Your Favorite Animes</h2>
      <div className="anime-emerge">
        {savedAnimes.map((anime) => (
          <div key={anime._id} className="anime-card">
            <img src={anime.image} alt={anime.title} className="anime-image" />
            <div className="anime-info">
              <h3>{anime.title}</h3>
              <p>Type: {anime.type}</p>
              <p>Episodes: {anime.total_episodes}</p>
              <p>Rating: {anime.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
