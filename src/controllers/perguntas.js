
const Question = require("../models/Question")
const Student = require("../models/Student")

module.exports = {
    async index(req, res) {

    },
    async store(req, res) {
        const { titulo, descricao, imagem, gist} = req.body;
        const {authorization} = req.headers;

        const aluno = await Student.findByPk(authorization);

        if (!aluno)
            return res.status(404).send("Usuario não encontrado!");

        try {
            let pergunta = aluno.createQuestion({ titulo, descricao, imagem, gist});

            res.status(201).send(pergunta)
            
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    async find(req, res) {

    },
    async update(req, res) {

    },
    async delete(req, res) {

    }
}