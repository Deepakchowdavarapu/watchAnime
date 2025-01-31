import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
// import { FaArrowRight } from "react-icons/fa";
import image from './../../Assets/anw-min.webp'
import { Link } from "react-router-dom";
import './Intro.css'
import Nav from './../NavBar/Nav'
import MiniNav from "../NavBar/MiniNav";
import './../NavBar/Nav.css'

export default function Intro() {
    return <div className="intro-fullpage">
    <Nav/>
        <div className="intro">
            <div className="intro-left">
                <h1>WatchAnime</h1>
                <p>Source : <a href="https://docs.api.jikan.moe/"> docs.api.jikan.moe </a> </p>
                <div className="matter">
                    <p>• An Anime Library App Displaying a list of anime inspired by
                        Popular anime with Over 5 million Views fetched from official anime API
    <br />
                        {/* • Used a modern JavaScript framework (React) to build the front end.
                        • Fetch the data dynamically using a RESTful API (Node.js/Express) */}

                        • tech stack : MERN
                        </p>

                    {/* <br /> */}
                    <h3>Key Features:</h3>
                    <p>Integrated with MongoDB database for storing user and anime datas</p>
                    <p>• User Authentication with JWT</p>
                    <p>Technologies interacted with :</p>
                    <p style={{color:"black"}}>  React , React-Router , Axios , React Icons , NodeJS</p>
                    <p style={{color:"black"}}>JWT , bcrypt , dotenv , vite , Express , Mongoose , MongoDB</p>
                    <p>• RESTful API supporting various endpoints</p>
                    <p>• Search functionality to find specific anime</p>
                    <p>• Fucntions to browse , save , rate your favorite animes</p>
                    <p>• Detailed anime information including synopsis, ratings, and more</p>
                    {/* </p> */}

                    <Link to="/browse" className="explore"> <p>Explore</p></Link>
                                </div>
            </div>
            <div className="intro-right">
                <img src={image} alt="photo" />
            </div>
        </div>
    <MiniNav/>
    </div>
}