'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("tblAnswer",{
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      description:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      question_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tblQuestion",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      student_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tblStudent",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('tblAnswer')
  }
};
