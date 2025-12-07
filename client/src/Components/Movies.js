import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { buyMovies } from "../Features/UserSlice";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const { user, purchase, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:4001/getMovies");
        setMovies(response.data.movies);
      } catch (error) {
        setErrorMsg("Error fetching movies. Please try again.");
      }
    };
    fetchMovies();
  }, []);

  const handleSelect = (movieId) => {
    if (selected.includes(movieId)) {
      setSelected(selected.filter((id) => id !== movieId));
    } else {
      setSelected([...selected, movieId]);
    }
  };

  const handleBuy = () => {
    if (selected.length === 0) return alert("Select at least one movie to buy.");
    dispatch(buyMovies({ movieIds: selected }));
  };

  const deleteMovie = async (movieId) => {
    try {
      await axios.delete(`http://localhost:4001/deleteMovie/${movieId}`);
      setMovies(movies.filter((movie) => movie._id !== movieId));
      setErrorMsg("Movie deleted successfully!");
    } catch (error) {
      setErrorMsg("Error deleting the movie. Please try again.");
    }
  };

  return (
    <div className="movies-container">
      <h2>Movie List</h2>
      {errorMsg && <div className="error-message">{errorMsg}</div>}

      <table className="movies-table">
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Price</th>
            <th>Genre</th>
            {user?.role === "admin" && <th>Actions</th>}
            {user?.role === "user" && <th>Select</th>}
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.name}</td>
                <td>${movie.price}</td>
                <td>{movie.type}</td>

                {user?.role === "admin" && (
                  <td>
                    <Link to={`/updateMovie/${movie._id}`} className="edit-button">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteMovie(movie._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                )}

                {user?.role === "user" && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(movie._id)}
                      onChange={() => handleSelect(movie._id)}
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={user?.role === "admin" ? 4 : 4}>No movies available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {user?.role === "user" && (
        <div className="buy-section">
          <button onClick={handleBuy} className="buy-button" disabled={loading}>
            {loading ? "Processing..." : "Buy Movies"}
          </button>

          {purchase && (
            <div className="purchase-summary">
              <h3>Purchase Summary</h3>
              <p>Total Price: ${purchase.totalPrice}</p>
              <ul>
                {purchase.movies.map((m) => (
                  <li key={m._id}>
                    {m.name} - ${m.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
