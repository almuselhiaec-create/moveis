import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcrypt";
import UserModel from "./Models/UserModel.js";
import MovieModel from "./Models/MovieModel.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cmovie.xpfjhgu.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=cmovie`;

mongoose.set("strictQuery", true);

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ==================== USER APIs ====================

// Register user API
app.post("/registerUser", async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      address,
      role: role || "user", // default to normal user
    });

    await newUser.save();
    res.status(200).json({ user: newUser, msg: "Registered Successfully!" });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ msg: "There was an error while registering." });
  }
});

// Login API
app.post("/loginUser", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter both email and password." });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    res.status(200).json({
      msg: "Login successful!",
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ msg: "There was an error during login." });
  }
});

// ==================== MOVIES APIs ====================

// Add Movie (Admin only)
app.post("/addMovie", async (req, res) => {
  try {
    const { name, price, type } = req.body;
    const newMovie = new MovieModel({ name, price, type });
    await newMovie.save();
    res.status(201).json({ msg: "Movie added successfully!", movie: newMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "There was an error adding the movie." });
  }
});

// Get all movies
app.get("/getMovies", async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).json({ movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ msg: "Error fetching movies." });
  }
});

// Get a single movie
app.get("/getMovie/:id", async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found." });
    res.status(200).json({ movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching movie." });
  }
});

// Update a movie (Admin only)
app.put("/updateMovie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const { name, price, type } = req.body;

    const updatedMovie = await MovieModel.findByIdAndUpdate(
      movieId,
      { name, price, type },
      { new: true }
    );

    if (!updatedMovie) return res.status(404).json({ msg: "Movie not found." });

    res.status(200).json({ msg: "Movie updated successfully!", movie: updatedMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating the movie." });
  }
});

// Delete a movie (Admin only)
app.delete("/deleteMovie/:id", async (req, res) => {
  try {
    const deletedMovie = await MovieModel.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ msg: "Movie not found." });

    res.status(200).json({ msg: "Movie deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error deleting the movie." });
  }
});

// ==================== BUY MOVIES (Normal Users) ====================
app.post("/buyMovies", async (req, res) => {
  try {
    const { movieIds } = req.body;
    const movies = await MovieModel.find({ _id: { $in: movieIds } });
    const totalPrice = movies.reduce((sum, m) => sum + m.price, 0);

    res.status(200).json({ movies, totalPrice, msg: "Purchase successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error processing purchase." });
  }
});
