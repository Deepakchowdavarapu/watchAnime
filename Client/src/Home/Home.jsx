import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./../NavBar/Nav";
import MiniNav from "./../NavBar/MiniNav";
import "./Home.css";
import List from "../List/List";
import useFetchUserData from "../../Hooks/useFetchUserData";

const Home = () => {
  const navigate = useNavigate();  
  const { fetchTokenData } = useFetchUserData();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTokenData();
  }, [navigate]);

  return (
    <div className="home">
      <div className="top-picks">
      </div>
      <Nav />
      <List />
      <MiniNav />
    </div>
  );
};

export default Home;
