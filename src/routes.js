const express = require('express');

const alunoController = require('./controllers/alunos')
const perguntaControllers = require('./controllers/perguntas')
const routes = express.Router();
//configuração da rota

//rotas de alunos
routes.get("/alunos", alunoController.listarAlunos);

routes.post("/alunos", alunoController.adicionarAlunos);

routes.delete("/alunos/:id", alunoController.deletarAluno);

routes.put("/alunos/:id", alunoController.atualizarAluno);

routes.get("/alunos/:id", alunoController.acharAluno);

//rotas de perguntas 

routes.post("/pergunta", perguntaControllers.store)

module.exports = routes;