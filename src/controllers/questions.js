const Question = require("../models/Question");
const Student = require("../models/Student");
const Answer = require("../models/Answer");

module.exports = {
  async index(req, res) {
    const { studentId } = req;
    const student = await Student.findByPk(studentId);

    try {
      if (!student) return res.status(404).send("Usuario não encontrado!");

      const questions = await Question.findAll({
        // where:{
        //     student_id: studentId
        //     },
        include: [Student, Answer],
      });
      res.status(201).send(questions);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  async store(req, res) {
    const { title, description, gist, categories } = req.body;
    const { studentId } = req;

    const categoriesArr = categories.split(",");

    const student = await Student.findByPk(studentId);

    if (!student)
      return res.status(404).send({ error: "Usuario não encontrado!" });

    try {
      let question = await student.createQuestion({
        title,
        description,
        image: req.file.firebaseUrl,
        gist,
      });

      await question.addCategories(categoriesArr);

      res.status(201).send({
        id: question.id,
        title: question.title,
        description: question.description,
        createdAt: question.created_at,
        gist: question.gist,
        image: req.file.firebaseUrl,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  async find(req, res) {},
  async update(req, res) {
    const questionId = req.params.id;
    const { title, description } = req.body;
    const { studentId } = req;

    try {
      const question = await Question.findOne({
        where: {
          id: questionId,
          student_id: studentId,
        },
      });
      if (!question)
        return res.status(400).send({ error: "Erro ao atualizar a mensagem!" });
      question.title = title;
      question.description = description;

      question.save();

      return res.status(200).send("Pergunta atualizada!");
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async delete(req, res) {
    const questionId = req.params.id;
    const { studentId } = req;

    try {
      let question = await Question.findOne({
        where: {
          id: questionId,
          student_id: studentId,
        },
      });
      if (!question)
        return res
          .status(400)
          .send({ error: "Erro ao apagar a mensagem! Usuario sem permissão" });

      await question.destroy();
      return res.status(200).send("Pergunta apagada!");
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
