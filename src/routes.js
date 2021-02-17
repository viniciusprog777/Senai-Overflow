const express = require("express");
const Multer = require("multer");

const multer = Multer();

const studentValidator = require("./validators/studentValidation");
const questionValidator = require("./validators/questionValidation");
const answerValidator = require("./validators/answerValidation");
const authMiddleware = require("./middleware/authorization");
const uploadSingleImage = require("./middleware/uploadSingleImage");
const uploadFirebase = require("./services/uploadFirebase");

const studentController = require("./controllers/students");
const questionControllers = require("./controllers/questions");
const answerControllers = require("./controllers/answers");
const feedControllers = require("./controllers/feed");
const sessionControllers = require("./controllers/sessions");
const categoriesControllers = require("./controllers/categories");
const studentImagesControllers = require("./controllers/studentImages");
const searchControllers = require("./controllers/search");

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

routes.post(
  "/students/images",
  uploadSingleImage,
  uploadFirebase,
  studentImagesControllers.store
);
//rotas de questions

routes.get("/questions", questionControllers.index);
routes.post(
  "/questions",
  uploadSingleImage,
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

//rotas de search
routes.get("/search/:description", searchControllers.index);

module.exports = routes;
