import { createRoot } from "react-dom/client";
import Register from "./Login/Register";
import Login from "./Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Manga from "./Manga/Manga";
import Browse from "./Browse/Browse";
import Intro from "./Intro/Intro";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Rate from "./Rate/Rate";
import Profile from "./Profile/Profile";

function Main() {
  const [starred, setStarred] = useState([]);

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       const token = localStorage.getItem("authToken");
  //       if (token) {
  //         const userData = await axios.get("https://watchanime-z8oa.onrender.com/user", {
  //           headers: {
  //             Authorization: token,
  //           },
  //         });
  //         setStarred(userData.data.starredAnimes || []);
  //       }
  //     };

  //     fetchUserData();
  //   }, []);

  //   useEffect(() => {
  //     const updateUserData = async () => {
  //       const token = localStorage.getItem("authToken");
  //       if (token) {
  //         await axios.put(
  //           "https://watchanime-z8oa.onrender.com/user",
  //           {
  //             starredAnimes: starred,
  //           },
  //           {
  //             headers: {
  //               Authorization: token,
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );
  //       }
  //     };
  //
  //     if (starred.length > 0) {
  //       updateUserData();
  //     }
  //   }, [starred]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/Intro" element={<Intro />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/rate" element={<Rate />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
