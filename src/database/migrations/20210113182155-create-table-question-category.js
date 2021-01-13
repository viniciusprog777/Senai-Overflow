'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("tblQuestion_Category", {
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tblPerguntas",
          key: "id"
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tblCategory",
          key: "id"
        },
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
    queryInterface.dropTable("tblQuestion_Category");
  }
};
