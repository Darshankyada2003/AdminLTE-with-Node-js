'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.renameColumn('users', 'fullName', 'f_name');

    await queryInterface.addColumn('users', 'l_name', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('users', 'image', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('users', 'number', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('users', 'dob', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('users', 'gender', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('users', 'hobbies', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.renameColumn('users', 'f_name', 'fullName')
    await queryInterface.removeColumn('users', 'l_name');
    await queryInterface.removeColumn('users', 'image');
    await queryInterface.removeColumn('users', 'number');
    await queryInterface.removeColumn('users', 'dob');
    await queryInterface.removeColumn('users', 'gender');
    await queryInterface.removeColumn('users', 'hobbies');
  }
};
