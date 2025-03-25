const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.HOST,
        dialect: "mysql",
        logging: false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("Database Connected")
    }).catch((err) => {
        console.err("Unable to connect to the database");
    })

sequelize.sync({ alter: true });

module.exports = {sequelize}