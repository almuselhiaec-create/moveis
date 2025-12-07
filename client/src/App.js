import "../src/Components/style.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import AddMovie from "./Components/AddMovie";
import Movies from "./Components/Movies";
import UpdateMovie from "./Components/UpdateMovie";
import User from "./Components/User";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Register always visible */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />

        {/* Login always visible */}
        <Route path="/login" element={<Login />} />

        {/* Movie app pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/User" element={<User />} />

        <Route path="/updatemovie/:id" element={<UpdateMovie />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
