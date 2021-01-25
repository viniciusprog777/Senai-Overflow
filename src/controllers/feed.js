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
        order: [["created_at", "DESC"]],
        attributes: ["id", "title", "description", "image", "gist"],
        // where:{
        //     student_id: studentId
        //     },
        include: [
          { association: "Student", attributes: ["id", "name", "email"] },
          {
            association: "Answers",
            attributes: ["id", "description", "created_at"],
            include: {
              association: "Student",
              attributes: ["id", "name"],
            },
          },
          {
            association: "Categories",
            attributes: ["id", "description"],
            through: { attributes: [] },
          },
        ],
      });
      res.status(201).send(questions);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
