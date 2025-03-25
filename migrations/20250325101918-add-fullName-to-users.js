'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('users', 'fullName', {
      type: Sequelize.STRING,
      allowNull: true, // Set to false if required
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('users');
  }
};
