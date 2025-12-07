import React, { useState } from "react";
import axios from "axios";

const AddMovie = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = { name, price, type };
    try {
      const response = await axios.post("http://localhost:4001/addMovie", movieData);
      setMsg(response.data.msg);
      setName(""); setPrice(""); setType("");
    } catch (error) {
      setMsg("Error adding movie. Please try again.");
    }
  };

  return (
    <div className="add-movie">
      <h2>Add New Movie</h2>
      {msg && <div className="message">{msg}</div>}
      <form onSubmit={handleSubmit} className="add-movie-form">
        <div className="form-group">
          <label htmlFor="name">Movie Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter movie name" />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="Enter price" />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type (Genre)</label>
          <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} required placeholder="Enter movie genre" />
        </div>
        <button type="submit" className="add-movie-button">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
