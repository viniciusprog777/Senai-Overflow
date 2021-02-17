const Question = require("../models/Question");
const Student = require("../models/Student");
const Answer = require("../models/Answer");

module.exports = {
  async index(req, res) {
    const { studentId } = req;
    let { pag } = req.params;
    pag = pag - 1;

    const student = await Student.findByPk(studentId);

    try {
      if (!student) return res.status(404).send("Usuario não encontrado!");

      const questions = await Question.findAll({
        order: [["created_at", "DESC"]],
        attributes: [
          "id",
          "title",
          "description",
          "image",
          "gist",
          "created_at",
        ],
        // where:{
        //     student_id: studentId
        //     },
        include: [
          {
            association: "Student",
            attributes: ["id", "name", "email", "image"],
          },
          {
            association: "Answers",
            attributes: ["id", "description", "created_at"],
            include: {
              association: "Student",
              attributes: ["id", "name", "image"],
            },
          },
          {
            association: "Categories",
            attributes: ["id", "description"],
            through: { attributes: [] },
          },
        ],
        limit: [5 * pag, 5],
      });
      res.status(201).send(questions);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
