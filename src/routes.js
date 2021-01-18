const express = require('express');

const studentController = require('./controllers/students')
const questionControllers = require('./controllers/questions');
const answerControllers = require('./controllers/answers');
const feedControllers = require("./controllers/feed")
const routes = express.Router();
//configuração da rota

//rotas de students
routes.get("/students", studentController.index);

routes.post("/students", studentController.store);

routes.delete("/students/:id", studentController.delete);

routes.put("/students/:id", studentController.update);

routes.get("/students/:id", studentController.find);

//rotas de questions 

routes.get("/questions", questionControllers.index);
routes.post("/questions", questionControllers.store);
routes.put("/questions/:id", questionControllers.update);
routes.delete("/questions/:id", questionControllers.delete);


//rotas de respostas
routes.post("/questions/:id/answers", answerControllers.store);

routes.get("/feed", feedControllers.index);

module.exports = routes;