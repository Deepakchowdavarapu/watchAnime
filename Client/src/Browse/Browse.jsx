import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Nav from "../NavBar/Nav";
import MiniNav from "../NavBar/MiniNav";
import "./Browse.css";
import useGetSavedAnimes from "../../Hooks/useGetSavedAnimes";
import useFetchUserData from "../../Hooks/useFetchUserData";
import { MdOutlineOpenInFull } from "react-icons/md";

export default function Browse() {
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [visibleDescription, setVisibleDescription] = useState(null);
  const { savedAnimes, setSavedAnimes, isLoading, error } = useGetSavedAnimes();
  const { fetchTokenData, userData } = useFetchUserData();
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    } else {
      fetchTokenData(); // Fetch user data
    }
  }, []);

  // Fetch anime data when `page` changes
  useEffect(() => {
    const loadAnimes = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/top/anime?page=${page}&limit=7`
        );
        const data = await response.json();
        // console.log(data.data[0].mal_id)
        // data.data.map((list)=>(
        //   console.log(list.mal_id)
        // ))
        const newInfo = data.data.map((anime) => ({
          id: anime.mal_id,
          title: anime.title,
          image: anime.images.jpg.image_url,
          description: anime.synopsis,
          type: anime.type,
          total_episodes: anime.episodes,
          rating: anime.score,
        }));

        setInfo((prevInfo) => [...prevInfo, ...newInfo]);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    loadAnimes();
  }, [page]);

  // Function to check if an anime is already saved
  const isAnimeSaved = (title) => {
    return savedAnimes?.some((anime) => anime.title === title) || false;
  };

  // Handle starring an anime (saving to favorites)
  const handleStarClick = async (event, anime) => {
    event.stopPropagation();
    if (!userData?.email) {
      console.warn("User email not available yet.");
      return;
    }

    try {
      const response = await fetch(
        "https://watchanime-z8oa.onrender.com/api/starred-anime",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.email,
            title: anime.title,
            image: anime.image,
            type: anime.type,
            total_episodes: anime.total_episodes,
            rating: anime.rating,
          }),
        }
      );

      const data = await response.json();
      console.log("Response from server:", data.message);

      // Update local state immediately
      if (isAnimeSaved(anime.title)) {
        // If anime was saved, remove it
        setSavedAnimes(
          savedAnimes.filter((saved) => saved.title !== anime.title)
        );
      } else {
        // If anime wasn't saved, add it
        setSavedAnimes([...savedAnimes, anime]);
      }
    } catch (error) {
      console.error("Error starring anime:", error);
    }
  };

  // Toggle description visibility
  const handleAnimeClick = (id) => {
    setVisibleDescription(visibleDescription === id ? null : id);
  };

  return (
    <div id="/browse" className="browse">
      <Nav />

      {isLoading ? (
        <div className="loading-time">
          <h1>Loading...</h1>
        </div>
      ) : error ? (
        <div className="error">
          <h1>Error: {error}</h1>
        </div>
      ) : info.length > 0 ? (
        <div className="anime-grid">
          {info.map((anime) => (
            <div
              key={anime.mal_id}
              className="anime-card"
              onClick={() => handleAnimeClick(anime.id)}
            >
              <FaStar
                className="star"
                onClick={(event) => handleStarClick(event, anime)}
                color={isAnimeSaved(anime.title) ? "gold" : "pink"}
                size={40}
              />
              <img src={anime.image} alt={anime.title} />
              <h3 id="anime-name">{anime.title}</h3>
              {/* {visibleDescription === anime.id && (
                <div className="anime-description" style={{position:"fixed",background:"white",top:0,left:0}}>
                  <h1 onClick={(e) => handleAnimeClick(e, anime)}>close</h1>
                  <p>Title: {anime.title}</p>
                  <img src={anime.image} alt="image" />
                  <p>Description:{anime.description}</p>
                  <p>
                    Info:{anime.type}
                    {anime.total_episodes}
                    {anime.rating}
                  </p>
                </div>
              )} */}
            </div>
          ))}
          <button onClick={() => setPage(page + 1)} className="load-more">
            <p>Load more</p>
          </button>
        </div>
      ) : (
        <div className="loading-time">
          <h1>No Animes Found</h1>
        </div>
      )}

      <MiniNav />
    </div>
  );
}
