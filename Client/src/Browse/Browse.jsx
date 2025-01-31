import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Nav from "../NavBar/Nav";
import MiniNav from "../NavBar/MiniNav";
import "./Browse.css";
import useGetSavedAnimes from "../../Hooks/useGetSavedAnimes";
import useFetchUserData from "../../Hooks/useFetchUserData";
import { json, useNavigate } from "react-router-dom";

export default function Browse() {
  const [info, setInfo] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [visibleDescription, setVisibleDescription] = React.useState(null);
  const { fetchSavedAnimes, savedAnimes, isLoading } = useGetSavedAnimes();
  const { fetchTokenData, userData } = useFetchUserData();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    } else {
      fetchTokenData();
    }
  }, []);

  useEffect(() => {
    const loadAnimes = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/top/anime?page=${page}&limit=5`
        );
        const data = await response.json();
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

  const handleStarClick = async (
    event,
    index,
    title,
    image,
    type,
    total_episodes,
    rating
  ) => {
    event.stopPropagation();

    try {
      const email_holder = await userData.email;
      console.log(`yo its me email`, email_holder);
      const response = await fetch("http://localhost:5775/api/starred-anime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_holder,
          title,
          image,
          type,
          total_episodes,
          rating,
        }),
      });
      const data = await response.json();
      console.log("Response from server:", data.message);
      await fetchSavedAnimes();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAnimeClick = (id) => {
    setVisibleDescription(visibleDescription === id ? null : id);
  };

  const isAnimeSaved = (title) => {
    if (!Array.isArray(savedAnimes)) return false;

    // Normalize the title for comparison
    const normalizedTitle = title.trim().toLowerCase();

    // Check if any saved anime's title matches the normalized title
    return savedAnimes.some(
      (saved) => saved.title.trim().toLowerCase() === normalizedTitle
    );
  };

  return (
    <div id="/browse" className="browse">
      <Nav />
      {info && info.length ? (
        <>
          <div className="animeList">
            {info.map((item) => (
              <div
                className="anime-holder"
                key={item.id}
                onClick={() => handleAnimeClick(item.id)}
              >
                <FaStar
                  className="star"
                  onClick={(event) =>
                    handleStarClick(
                      event,
                      item.id,
                      item.title,
                      item.image,
                      item.type,
                      item.total_episodes,
                      item.rating
                    )
                  }
                  color={isAnimeSaved(item.title) ? "gold" : "black"}
                  size={40}
                />
                <img src={item.image} alt="anime" />
                <h1 id="anime-name">{item.title}</h1>
                {visibleDescription === item.id && (
                  <div className="anime-description">{item.description}</div>
                )}
              </div>
            ))}
            <button onClick={() => setPage(page + 1)} className="load-more">
              <p>Load more</p>
            </button>
          </div>
        </>
      ) : (
        <div className="loading-time">
          <h1>Loading...</h1>
        </div>
      )}
      <MiniNav />
    </div>
  );
}
