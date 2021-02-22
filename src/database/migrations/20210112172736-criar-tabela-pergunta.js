"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("tblquestion", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allownull: false,
      },
      description: {
        type: Sequelize.STRING,
        allownull: false,
      },
      image: {
        type: Sequelize.STRING,
        allownull: true,
      },
      gist: {
        type: Sequelize.STRING,
        allownull: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tblstudent",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("tblquestion");
  },
};
