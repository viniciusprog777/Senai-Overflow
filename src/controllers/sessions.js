const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const auth = require("../config/auth.json");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../util");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;
    try {
      const student = await Student.findOne({
        where: {
          email,
        },
      });

      if (!student || !bcrypt.compareSync(password, student.password))
        return res.status(403).send({ error: "Usuário e/ou senha inválidos" });

      const token = generateToken({
        studentId: student.id,
        studentName: student.name,
      });

      res.status(201).send({
        student: {
          studentId: student.id,
          studentName: student.name,
          studentEmail: student.email,
          studentRa: student.ra,
          studentImage: student.image,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
