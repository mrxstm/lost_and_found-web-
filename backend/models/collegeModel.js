import { DataTypes} from "sequelize";
import { sequelize } from "../db.js";


export const College = sequelize.define("College", {  
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: "College",  
  freezeTableName: true
});
