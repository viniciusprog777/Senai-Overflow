"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tblcategory",
      [
        {
          description: "Projetos",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Web Back-End",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Web Front-End",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Mobile Front-End",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Mobile Back-End",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Sistemas Operacionais",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Banco de Dados",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Fundamentos de POO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Testes de Software",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Redes",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Hardware",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tblcategory", null, {});
  },
};
