import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Item = sequelize.define("Items", {
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    itemName: {
        type:DataTypes.STRING,
        allowNull:false
    },

    category: {
        type: DataTypes.STRING,
        allowNull:true   
    },

    itemDescription: {
        type:DataTypes.TEXT,
        allowNull:false
    },

    status: {
        type: DataTypes.ENUM('lost', 'found', 'claimed'),
        defaultValue:'lost'
    },
    
    location_id: {
        type: DataTypes.INTEGER,
        allowNull:false   
    },
      
    date: {
        type: DataTypes.DATE,
        allowNull:false   
    },

    image_urls: {
        type: DataTypes.JSON,
        allowNull:true   
    },

    reported_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    college_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false  // all new reports need admin approval
    }

})