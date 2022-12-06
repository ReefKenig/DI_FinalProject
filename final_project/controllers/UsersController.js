import Users from "../model/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const TWO_DAYS = 60 * 1000 * 60 * 24 * 2;

// Register a new user
export const register = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({ username: username, password: hashPassword });
    res.json({ msg: "Reigstered successfully!" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Username already exists" });
  }
};

// Login with an existing user
export const login = async (req, res) => {
  console.log(req.body);
  try {
    const user = await Users.findAll({
      where: { username: req.body.username },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });
    const userId = user[0].id;
    const username = user[0].username;
    const accessToken = jwt.sign(
      { userId, username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2d" }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: TWO_DAYS,
    });
    res.json({ token: accessToken });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Username not found" });
  }
};

// Logout user
export const logout = (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(204);
  res.clearCookie("accessToken");
  return res.sendStatus(200);
};
