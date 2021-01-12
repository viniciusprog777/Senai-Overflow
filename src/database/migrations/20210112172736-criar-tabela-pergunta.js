'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("tblPerguntas",{
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      titulo:{
        type: Sequelize.STRING,
        allownull: false
      },
      descricao:{
        type: Sequelize.STRING,
        allownull: false
      },
      imagem:{
        type: Sequelize.STRING,
        allownull: true
      },
      gist:{
        type: Sequelize.STRING,
        allownull: true
      },
      aluno_id:{
        type: Sequelize.INTEGER,
        references: {
          model: "tblalunos",
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
    queryInterface.dropTable("tblPerguntas")
  }
};
