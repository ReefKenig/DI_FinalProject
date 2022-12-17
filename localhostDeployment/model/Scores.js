import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Scores = db.define(
  "scores",
  {
    score_id: {
      field: "score_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER },
    score: { type: DataTypes.INTEGER },
  },
  { freezeTableName: true, timestamps: false }
);

export default Scores;
