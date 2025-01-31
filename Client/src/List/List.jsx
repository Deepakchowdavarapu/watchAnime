import useGetSavedAnimes from "../../Hooks/useGetSavedAnimes";
import './List.css'

const List = () => {
    const { savedAnimes, isLoading, error } = useGetSavedAnimes();

    if (isLoading) return <p>Loading saved animes...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!savedAnimes.length) return <p>No Favourites</p>;

    return (
        <div className="list">
            {savedAnimes.map((anime) => (
                <p key={anime._id}>{anime.title}</p>
            ))}
        </div>
    );
};

export default List;
