const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const { generateToken } = require("../util");

module.exports = {
  //função executada pela rota
  async index(req, res) {
    try {
      const students = await Student.findAll();

      res.status(200).send(students);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async store(req, res) {
    // try {
    //     const {ra, nome, email, senha} =  req.body;
    //         if (await Aluno.findOne({
    //             where:{
    //                 ra: ra
    //             }
    //         }))
    //         {
    //             console.log("Usuario existente!")
    //             res.status(400).send("Usuario existente!")

    //         }
    //         else{
    //             let aluno = await Aluno.create({
    //                 ra, nome, email, senha
    //             })
    //             res.status(201).send(aluno)
    //         }
    const { ra, name, email, password } = req.body;
    let student = await Student.findOne({
      where: {
        ra: ra,
      },
    });
    try {
      if (student) return res.status(400).send({ error: "Usuario existente!" });

      const passwordCript = bcrypt.hashSync(password);

      student = await Student.create({
        ra,
        name,
        email,
        password: passwordCript,
      });
      const token = generateToken({
        studentId: student.id,
        studentName: student.name,
      });

      return res.status(201).send({
        student: {
          studentId: student.id,
          studentName: student.name,
          studentEmail: student.email,
          studentRa: student.ra,
        },
        token,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async delete(req, res) {
    const id = req.params.id;

    let student = await Student.findByPk(id);
    try {
      if (!student)
        return res.status(400).send({ error: "Aluno não encontrado!" });
      await student.destroy();

      return res.status(200).send("Aluno apagado!");
    } catch (error) {
      return res.status(500).send(error);
    }
    //return console.log(typeof id, typeof alunos[0].ID)
    // alunos = alunos.filter(a => a.ID.toString() !== id)

    // res.status(204).send();
  },
  async update(req, res) {
    const id = req.params.id;

    const { name, email } = req.body;

    try {
      let student = await Student.findByPk(id);

      if (!student)
        return res.status(400).send({ error: "Aluno não encontrado!" });
      student.name = name;
      student.email = email;

      student.save();

      return res.status(200).send("Aluno Atualizado!");
    } catch (error) {
      return res.status(500).send(error);
    }
    // alunos = alunos.map(
    //     a => a.ID.toString() === id ? {...a, NOME, EMAIL} : a
    //     );

    // for (let index = 0; index < alunos.length; index++) {
    //     if (alunos[index].ID == id) {
    //         alunos[index] = {...alunos[index], NOME, EMAIL}
    //     }

    // }
    // res.status(204).send();
  },
  async find(req, res) {
    const id = req.params.id;

    let student = await Student.findByPk(id, {
      attributes: ["id", "ra", "name", "email"],
    });
    try {
      if (student) return res.status(200).send(student);
      return res.status(400).send({ error: "Aluno não encontrado!" });
    } catch (error) {
      return res.status(500).send(error);
    }
    //return console.log(typeof id, typeof alunos[0].ID)
    // aluno = alunos.find(a => a.ID.toString() === id)
    // if (aluno) {
    //     //Apagando um elemnto da lista
    //     delete aluno.SENHA;
    //     return res.status(200).send(aluno);
    // }

    //     res.status(404).send({erro: "Aluno não encontrado"})
  },
};
