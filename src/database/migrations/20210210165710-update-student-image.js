"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("tblStudent", "image", {
      type: Sequelize.DataTypes.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("tblStudent", "image");
  },
};
