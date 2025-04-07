const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/sequelize_db');

const users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    f_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    l_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    number: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dob: {
        type: Sequelize.STRING,
        allowNull: true
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: true
    },
    hobbies: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = users;