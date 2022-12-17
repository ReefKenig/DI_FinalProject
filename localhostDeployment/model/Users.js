import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    user_id: {
      field: "user_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    createdAt: { field: "created_at", type: DataTypes.DATE },
    updatedAt: { field: "updated_at", type: DataTypes.DATE },
  },
  { freezeTableName: true, timestamps: true }
);

export default Users;
