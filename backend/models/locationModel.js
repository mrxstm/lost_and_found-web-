import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Location = sequelize.define(
  "Locations",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    college_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    uniqueKeys: {
      uniqueLocationPerCollege: {
        fields: ["college_id", "name"]
      }
    }
  }
);
