import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import pgp from "pg-promise";
import db from "./config/Database.js";
// import router from "./routes/Users.js";

dotenv.config();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(router)

try {
  const db = pgp(process.env.DB_HOST);
} catch (error) {
  console.log("Could not connect to Postgres\n", error);
}
// try {
//   await db.authenticate();
//   console.log("Database connected!");
// } catch (err) {
//   console.log(err);
// }

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on ${process.env.PORT || 8080}`);
});
