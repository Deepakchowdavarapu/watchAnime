
# WatchAnime

WatchAnime is a web application that allows users to browse, save, and rate their favorite animes. It is built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
- **Browse Animes**: View a list of animes fetched from an external API.
- **Save and Rate Animes**: Add favorite animes to your list and rate them based on your preferences.
- **Detailed Anime Information**: View comprehensive details, including anime synopsis, ratings, and more.
- **Anime Recommendations**: Content-based filtering using TF-IDF to recommend similar animes based on descriptions.
- **MongoDB Integration**: Store user data and favorite animes in MongoDB.
- **RESTful API**: Supports various endpoints for retrieving and managing anime data.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces
- **React Router**: A library for routing in React applications
- **Axios**: A promise-based HTTP client for making API requests
- **Vite**: A fast build tool for modern web projects
- **ESLint**: A tool for identifying and fixing problems in JavaScript code
- **CSS**: Styling the application

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine
- **Express**: A minimal and flexible Node.js web application framework
- **MongoDB**: A NoSQL database for storing user and anime data
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js
- **JWT (jsonwebtoken)**: A library for generating and verifying JSON Web Tokens
- **bcrypt**: A library for hashing passwords
- **dotenv**: A module for loading environment variables from a `.env` file

### Future Plannings : Machine Learning

- **TF-IDF**: Implementing content-based filtering using TF-IDF to recommend similar animes based on anime descriptions.
- **Cosine Similarity**: Using cosine similarity to calculate the similarity between animes and recommend the most similar ones to users.
