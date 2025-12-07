import React from "react";
import img1 from "./images/img1.png";
import img2 from "./images/img.png";
import img3 from "./images/img3.png";

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Movie Stream</h1>
        <p>Your ultimate movie streaming platform</p>
      </header>
      <section className="featured-movies">
        <h2>Featured Movies</h2>
        <div className="movies-list">
          <div className="movie-item">
            <img src={img1} alt="Movie 1" />
            <h3>Movie Title 1</h3>
          </div>
          <div className="movie-item">
            <img src={img2} alt="Movie 2" />
            <h3>Movie Title 2</h3>
          </div>
          <div className="movie-item">
            <img src={img3} alt="Movie 3" />
            <h3>Movie Title 3</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
