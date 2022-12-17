import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import usersRouter from "./routers/Users.js";
import scoresRouter from "./routers/Scores.js";
import leaderboardRouter from "./routers/Leaderboard.js";

dotenv.config();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(usersRouter);
app.use(scoresRouter);
app.use(leaderboardRouter);

try {
  await db.authenticate();
  console.log("Database connected!");
} catch (err) {
  console.log(err);
}

app.listen(process.env.PORT || 3030, () => {
  console.log(`Server listening on ${process.env.PORT || 3030}`);
});
