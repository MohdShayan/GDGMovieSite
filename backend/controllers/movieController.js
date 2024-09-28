import Movie from "../models/movieModel.js";
import mongoose from "mongoose";

export const createMovies = async (req, res) => {
  const { title, genre, rating, releaseDate, image } = req.body;

  if (!title || !genre || rating === undefined || !releaseDate || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }

  try {
    const movie = new Movie({ title, genre, rating, releaseDate, image });
    await movie.save();
    res.status(201).json({ success: true, message: "Movie Created !" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getAllMovies = async (req, res) => {
  const { genre, year } = req.query;
  const query = {};

  if (genre) {
    query.genre = { $regex: new RegExp(genre, "i") };
  }

  if (year) {
    const yearNumber = parseInt(year, 10);
    if (!isNaN(yearNumber)) {
      query.releaseDate = {
        $gte: new Date(yearNumber, 0, 1),
        $lt: new Date(yearNumber + 1, 0, 1),
      };
    }
  }

  try {
    const movies = await Movie.find(query);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error }); 
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid movie ID" });
  }

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    res.status(200).json({ success: true, message: "Movie deleted" });
  } catch (error) {
    console.error("Error deleting Movie:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const movie = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid movie ID" });
  }

  if (
    !movie.title ||
    !movie.genre ||
    movie.rating === undefined ||
    !movie.releaseDate ||
    !movie.image
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, movie, {
      new: true,
    });
    if (!updatedMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    res.status(200).json({ success: true, data: updatedMovie });
  } catch (error) {
    console.error("Error updating movie:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
