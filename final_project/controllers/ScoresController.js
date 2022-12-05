import Scores from "../model/Scores.js";
import Users from "../model/Users.js";

Users.hasMany(Scores, { foreignKey: "user_id" });
Scores.belongsTo(Users, { foreignKey: "user_id" });

// Add new score
export const newScore = async (req, res) => {
  const { user_id, score } = req.body;
  try {
    await Scores.create({ user_id: user_id, score: score });
    res.json({ msg: "Score saved!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Invalid User ID", error: error });
  }
};

// Get high score of user_id
export const getUserHighScore = async (req, res) => {
  const { user_id } = req.body;
  try {
    const highscore = await Scores.max("score", {
      where: { user_id: user_id },
    });
    if (highscore) res.json({ highscore: highscore });
    else res.json({ highscore: null });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Invalid User ID" });
  }
};

// TODO: Get top 3 highest scores with their usernames
export const getHighestScores = async (req, res) => {
  try {
    const highscores = await Scores.findAll({
      attributes: [["MAX(score)", "highscore"]],
      include: [Users],
    });
    // res.json({ score: highscores.score, username: highscores });
    res.json({ highscores: highscores });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "bad request" });
  }
};
