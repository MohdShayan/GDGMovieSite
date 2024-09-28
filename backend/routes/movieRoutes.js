import express from "express";
import {
  createMovies,
  getAllMovies,
  deleteMovie,
  updateMovie,
} from "../controllers/movieController.js";
const router = express.Router();

router.post("/", createMovies);
router.get("/", getAllMovies);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);



export default router;
