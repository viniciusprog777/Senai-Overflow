const express = require('express');

const authMiddleware = require('./middleware/authorization')

const studentController = require('./controllers/students')
const questionControllers = require('./controllers/questions');
const answerControllers = require('./controllers/answers');
const feedControllers = require("./controllers/feed")
const sessionControllers = require('./controllers/sessions')
const routes = express.Router();
//configuração da rota

//rotas publicas
routes.post('/sessions', sessionControllers.store);
routes.post("/students", studentController.store);

routes.use(authMiddleware);

//rotas de students
routes.get("/students", studentController.index);

routes.delete("/students/:id", studentController.delete);

routes.put("/students/:id", studentController.update);

routes.get("/students/:id", studentController.find);

//rotas de questions 

routes.get("/questions", questionControllers.index);
routes.post("/questions", questionControllers.store);
routes.put("/questions/:id", questionControllers.update);
routes.delete("/questions/:id", questionControllers.delete);


//rotas de answers
routes.post("/questions/:id/answers", answerControllers.store);

//rotas de feed
routes.get("/feed", feedControllers.index);

module.exports = routes;