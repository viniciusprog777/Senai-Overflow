const Question = require("../models/Question");
const Student = require("../models/Student");
const Answer = require("../models/Answer");

module.exports = {
  async index(req, res) {},
  //função para adicionar uma resposta
  async store(req, res) {
    const { description } = req.body;
    const { studentId } = req;
    const questionId = req.params.id;

    const student = await Student.findByPk(studentId);
    const question = await Question.findByPk(questionId);

    if (!student)
      return res.status(404).send({ error: "Usuario não encontrado!" });
    else if (!question)
      return res.status(404).send({ error: "Pergunta não encontrada!" });

    try {
      let answer = await question.createAnswer({
        description,
        student_id: studentId,
      });

      return res.status(200).send(answer);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
