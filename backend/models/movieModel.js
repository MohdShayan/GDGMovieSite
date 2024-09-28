import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      genre: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
      },
      releaseDate: {
        type: Date,
        required: true
      },
      image: {
        type: String,
        required: true
    }
});

const Movie = mongoose.model('Movie',movieSchema);

export default Movie;