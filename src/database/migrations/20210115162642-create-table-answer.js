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
          model: "tblPerguntas",
          key: "id"
        }
      },
      student_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tblAlunos",
          key: "id"
        }
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
