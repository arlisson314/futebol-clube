'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {*import('sequelize').Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  down: async(queryInterface, _Sequelize) => {
    await queryInterface.dropTable('teams');
  },
};
