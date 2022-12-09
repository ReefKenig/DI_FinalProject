import express from "express";
import { getHighestScores } from "../controllers/ScoresController.js";

const leaderboardRouter = express.Router();

leaderboardRouter.get("/highscores", getHighestScores);

export default leaderboardRouter;
