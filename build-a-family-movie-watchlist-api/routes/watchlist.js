import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../utils/db.js";

const router = express.Router();

router.use(authenticate);

router.get("/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  const watchlist = getWatchlist(userId);

  return res.status(200).json(watchlist || []);
});

router.post("/:userId/movies", authorizeModification, async (req, res) => {
  const userId = Number(req.params.userId);
  const movie = addMovie(userId, req.body);

  return res.status(201).json(movie);
});

router.put("/:userId/movies/:movieId", authorizeModification, async (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);

  const updated = updateMovie(userId, movieId, req.body);

  return res.status(200).json(updated);
});

router.delete("/:userId/movies/:movieId", authorizeModification, async (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);

  deleteMovie(userId, movieId);

  return res.status(200).json({ message: "Movie removed." });
});

export default router;