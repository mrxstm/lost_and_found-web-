import Sequelize from 'sequelize';

export const sequelize = new Sequelize("lostandfound_db", "postgres", "postgres", { //database username password
    host: "localhost",
    dialect: "postgres"
});

export const connection = () => {
    try {
        sequelize.sync({alter: true});
        console.log("Database connected successfully");
        
    } catch(err) {
        console.log("Database connection failed : ", err);
        
    }
}
