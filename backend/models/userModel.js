import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Users = sequelize.define("Users", {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    fullname: {
        type:DataTypes.STRING,
        allowNull:false
    },

    username: {
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },

    email: {
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },

    password_hash: {
        type:DataTypes.STRING,
        allowNull:false
    },
    
    phone_no: {
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },

    gender: {
        type:DataTypes.STRING,
        allowNull:false
    },
    profile_pic_url: {
        type:DataTypes.STRING,
        allowNull:true
    },
    college_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: "College",
            key: "id"
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'user'
    }
});