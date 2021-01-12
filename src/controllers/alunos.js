const Student = require("../models/Student");


module.exports = {
    //função executada pela rota
    async listarAlunos (req, res){
        try {
            const alunos = await Student.findAll();
        
            res.send(alunos);
        } catch (error) {
            console.log(error);
            res.status(500).send({error})
        }
       

        
            
    },
    async adicionarAlunos (req, res) {
     
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
        const {ra, nome, email, senha} =  req.body;
        let aluno = await Student.findOne({
            where:{
                ra: ra
            }
        })
        try {
            if (aluno) 
                return res.status(400).send("Usuario existente!")
            aluno = await Student.create({
                ra, nome, email, senha
            })
            return res.status(201).send(aluno)
                
        } catch (error) {
            return res.status(500).send(error)
        }
        
        
        
    },
    async deletarAluno (req, res){
        const id = req.params.id;
        
        let aluno = await Student.findByPk(id)
        try {
            if (!aluno) 
                return res.status(400).send("Aluno não encontrado!")
            await aluno.destroy();

            return res.status(200).send("Aluno apagado!")
        } catch (error) {
            return res.status(500).send(error)
        }
        //return console.log(typeof id, typeof alunos[0].ID)
        // alunos = alunos.filter(a => a.ID.toString() !== id)
    
        // res.status(204).send();
    },
   async atualizarAluno (req, res){
        const id = req.params.id;
    
        const {nome, email} = req.body;
        
        try {
            let aluno = await Student.findByPk(id)
            
            if (!aluno) 
                return res.status(400).send("Aluno não encontrado!")
            aluno.nome = nome;
            aluno.email = email;

            aluno.save();

            return res.status(200).send("Aluno Atualizado!")

        } catch (error) {
            return res.status(500).send(error)
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
    async acharAluno (req, res){
        const id = req.params.id;
        
        let aluno = await Student.findByPk(id,{
            attributes: ["id", "ra", "nome", "email"]
        })
        try {
            if (aluno) 
                return res.status(200).send(aluno)
            return res.status(400).send("Aluno não encontrado!")
                
        } catch (error) {
            return res.status(500).send(error)
        }
        //return console.log(typeof id, typeof alunos[0].ID)
        // aluno = alunos.find(a => a.ID.toString() === id)
        // if (aluno) {
        //     //Apagando um elemnto da lista 
        //     delete aluno.SENHA;
        //     return res.status(200).send(aluno);
        // }
       
        //     res.status(404).send({erro: "Aluno não encontrado"})
        
    
    }
}