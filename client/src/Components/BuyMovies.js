import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BuyMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);
  const [msg, setMsg] = useState("");

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    axios.get("http://localhost:4001/getMovies").then((res) => {
      setMovies(res.data.movies);
    });
  }, []);

  const toggleSelect = (movie) => {
    let updated;

    if (selected.includes(movie)) {
      updated = selected.filter((m) => m !== movie);
    } else {
      updated = [...selected, movie];
    }

    setSelected(updated);
    setTotal(updated.reduce((sum, m) => sum + m.price, 0));
  };

  const handleBuy = async () => {
    if (!user) return setMsg("You must log in.");

    const res = await axios.post("http://localhost:4001/buyMovies", {
      userId: user._id,
      movies: selected.map((m) => m._id),
    });

    setMsg(res.data.msg + " | Total: $" + res.data.totalPrice);

    setSelected([]);
    setTotal(0);
  };

  return (
    <div className="buy-page">
      <h2>Select Movies to Buy</h2>

      {msg && <div className="msg">{msg}</div>}

      {movies.map((movie) => (
        <label key={movie._id} className="movie-item">
          <input
            type="checkbox"
            checked={selected.includes(movie)}
            onChange={() => toggleSelect(movie)}
          />
          {movie.name} — ${movie.price}
        </label>
      ))}

      <h3>Total: ${total}</h3>

      {selected.length > 0 && (
        <button className="buy-button" onClick={handleBuy}>
          Confirm Purchase
        </button>
      )}
    </div>
  );
};

export default BuyMovies;
