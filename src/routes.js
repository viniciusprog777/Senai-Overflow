const express = require('express');

const alunoController = require('./controllers/alunos')
const perguntaControllers = require('./controllers/perguntas');
const answerControllers = require('./controllers/answers');
const routes = express.Router();
//configuração da rota

//rotas de alunos
routes.get("/alunos", alunoController.listarAlunos);

routes.post("/alunos", alunoController.adicionarAlunos);

routes.delete("/alunos/:id", alunoController.deletarAluno);

routes.put("/alunos/:id", alunoController.atualizarAluno);

routes.get("/alunos/:id", alunoController.acharAluno);

//rotas de perguntas 

routes.get("/perguntas", perguntaControllers.index);
routes.post("/pergunta", perguntaControllers.store);
routes.put("/pergunta/:id", perguntaControllers.update);
routes.delete("/pergunta/:id", perguntaControllers.delete);


//rotas de respostas
routes.post("/perguntas/:id/resposta", answerControllers.store)

module.exports = routes;