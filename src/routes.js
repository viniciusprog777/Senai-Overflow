const express = require("express");
const Multer = require("multer");

const multer = Multer();

const studentValidator = require("./validators/studentValidation");
const questionValidator = require("./validators/questionValidation");
const answerValidator = require("./validators/answerValidation");
const authMiddleware = require("./middleware/authorization");
const uploadQuestion = require("./middleware/uploadQuestions");
const uploadFirebase = require("./services/uploadFirebase");

const studentController = require("./controllers/students");
const questionControllers = require("./controllers/questions");
const answerControllers = require("./controllers/answers");
const feedControllers = require("./controllers/feed");
const sessionControllers = require("./controllers/sessions");
const categoriesControllers = require("./controllers/categories");

const routes = express.Router();

// const multer = Multer({
//     storage: Multer.diskStorage({
//         destination: "./src/uploads/",
//         filename: (req, file, callback) => {
//             const filename = Date.now() + "." + file.originalname.split(".").pop();

//             return callback(null, filename);
//         }
//     })
// });
//configuração da rota

// routes.post("/upload", multer.single("arquivo"), (req, res) => {
//     console.log(req.file);
//     res.send(req.file)
// })
//rotas publicas
routes.post("/sessions", sessionControllers.store);
routes.post("/students", studentValidator.create, studentController.store);

routes.use(authMiddleware);

//rotas de categoria
routes.get("/categories", categoriesControllers.index);

//rotas de students
routes.get("/students", studentController.index);

routes.delete("/students/:id", studentController.delete);

routes.put("/students/:id", studentController.update);

routes.get("/students/:id", studentController.find);

//rotas de questions

routes.get("/questions", questionControllers.index);
routes.post(
  "/questions",
  uploadQuestion,
  uploadFirebase,
  questionValidator.create,
  questionControllers.store
);
routes.put("/questions/:id", questionControllers.update);
routes.delete("/questions/:id", questionControllers.delete);

//rotas de answers
routes.post(
  "/questions/:id/answers",
  answerValidator.create,
  answerControllers.store
);

//rotas de feed
routes.get("/feed", feedControllers.index);

module.exports = routes;
