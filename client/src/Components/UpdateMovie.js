import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({ name: "", price: "", type: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getMovie/${id}`);
        setMovieData(response.data.movie);
      } catch (error) {
        setMsg("Error fetching movie data.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateMovie/${id}`, movieData);
      setMsg(response.data.msg);
      setTimeout(() => navigate("/Movies"), 1500);
    } catch (error) {
      setMsg("Error updating the movie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-movie">
      <h2>Update Movie Details</h2>
      {msg && <div className="message">{msg}</div>}
      {loading && <div>Loading...</div>}
      <form onSubmit={handleSubmit} className="update-movie-form">
        <div className="form-group">
          <label>Movie Name</label>
          <input type="text" name="name" value={movieData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" value={movieData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input type="text" name="type" value={movieData.type} onChange={handleChange} required />
        </div>
        <button type="submit" className="update-movie-button">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
