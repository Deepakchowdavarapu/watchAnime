import { useState, useEffect } from "react";
import useFetchUserData from "./useFetchUserData"; // Assuming this hook fetches user data

const useGetSavedAnimes = () => {
    const { fetchTokenData, userData } = useFetchUserData();
    const [savedAnimes, setSavedAnimes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user token on mount
    useEffect(() => {
        fetchTokenData();
    }, []);

    // Fetch saved animes when email is available
    useEffect(() => {
        const fetchSavedAnimes = async () => {
            if (!userData?.email) return;

            setIsLoading(true);
            try {
                // console.log("Fetching saved animes for:", userData.email);

                const response = await fetch("http://localhost:5775/api/starred-anime-titles", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: userData.email }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                // console.log(data)
                setSavedAnimes(data);
            } catch (error) {
                console.error("Error fetching saved animes:", error);
                setError(error.message);
                setSavedAnimes([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSavedAnimes();
    }, [userData.email]); // Runs only when `userData.email` updates

    return { savedAnimes, setSavedAnimes, isLoading, error };
};

export default useGetSavedAnimes;
