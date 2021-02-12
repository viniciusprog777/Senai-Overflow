const Student = require("../models/Student");

module.exports = {
  async store(req, res) {
    const { studentId } = req;

    const { firebaseUrl } = req.file;

    const student = await Student.findByPk(studentId);

    if (!firebaseUrl)
      return res.status(400).send({ error: "Campo imagem é obrigatório" });
    if (!student)
      return res.status(404).send({ error: "Usuario não encontrado!" });

    try {
      student.image = firebaseUrl;

      student.save();

      res.status(201).send({
        studentId,
        image: firebaseUrl,
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  },
};
