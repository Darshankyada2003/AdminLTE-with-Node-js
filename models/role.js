const { Sequelize } = require("sequelize");
const { sequelize } = require("../config/sequelize_db");

const role = sequelize.define("role", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = role;
