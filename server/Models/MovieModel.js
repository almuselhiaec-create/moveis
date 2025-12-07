import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
});

const MovieModel = mongoose.model("Movie", movieSchema);
export default MovieModel;
