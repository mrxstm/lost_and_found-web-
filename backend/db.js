import dotenv from "dotenv";
dotenv.config();

import Sequelize from 'sequelize';


export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false
});
export const connection = () => {
    try {
        sequelize.sync({alter: true});
        console.log("Database connected successfully");
        
    } catch(err) {
        console.log("Database connection failed : ", err);
        
    }
}
