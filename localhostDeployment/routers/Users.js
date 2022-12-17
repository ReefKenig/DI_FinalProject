import express from "express";
import { register, login, logout } from "../controllers/UsersController.js";
import { VerifyToken } from "../middlewares/VerifyToken.js";

const usersRouter = express.Router();

// register new user
usersRouter.post("/register", register);
// login with existing username and password
usersRouter.post("/login", login);
// logout from the system
usersRouter.delete("/logout", logout);
// token verification
usersRouter.get("/token", VerifyToken, (req, res) => {
  res.sendStatus(200);
});
// TODO: add update function (extra)
// TODO: add delete user function (extra)

export default usersRouter;
