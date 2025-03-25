'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('users',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING
        }
      }
    );

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('users');

  }
};
