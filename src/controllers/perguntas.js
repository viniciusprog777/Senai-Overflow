
const Question = require("../models/Question")
const Student = require("../models/Student")

module.exports = {
    async index(req, res) {
        const {authorization} = req.headers;
        const student = await Student.findByPk(authorization);

        try {
            if (!student) 
                return res.status(404).send("Usuario não encontrado!");
        
            const questions = await Question.findAll({
            where:{
                aluno_id: authorization
            }
            });
            res.status(201).send(questions);
        } 
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

       
    },
    async store(req, res) {
        const { titulo, descricao, imagem, gist, categorias} = req.body;
        const {authorization} = req.headers;

        const aluno = await Student.findByPk(authorization);

        if (!aluno)
            return res.status(404).send("Usuario não encontrado!");

        try {
            let pergunta = await aluno.createQuestion({ titulo, descricao, imagem, gist});

            await pergunta.addCategories(categorias);

            res.status(201).send(pergunta)
            
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    async find(req, res) {

    },
    async update(req, res) {
        const questionId = req.params.id;
        const {titulo, descricao} = req.body;
        const {authorization} = req.headers;

        try {
            const question = await Question.findOne({
                where:{
                    id: questionId,
                    aluno_id: authorization
                }
            })
            if (!question) 
                return res.status(400).send("Erro ao atualizar a mensagem!")
            question.titulo = titulo;
            question.descricao = descricao;

            question.save();

            return res.status(200).send("Pergunta atualizada!")
            
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    async delete(req, res) {
        const questionId = req.params.id;
        const {authorization} = req.headers;

        
        try {
            let question = await Question.findOne({
                where:{
                    id: questionId,
                    aluno_id: authorization
                }
            });
            if (!question) 
                return res.status(400).send("Erro ao apagar a mensagem! Usuario sem permissão")
            

            await question.destroy()
            return res.status(200).send("Pergunta apagada!")

        } catch (error) {
            return res.status(500).send(error)
        }
    }
}