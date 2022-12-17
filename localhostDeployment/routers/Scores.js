import express from "express";
import { newScore, getUserHighScore } from "../controllers/ScoresController.js";

const scoresRouter = express.Router();

scoresRouter.post("/newscore", newScore);
scoresRouter.get("/userhighscore", getUserHighScore);

export default scoresRouter;
