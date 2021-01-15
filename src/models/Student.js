const {Model, DataTypes} = require("sequelize");

class Student extends Model {
    //aqui inicializamos os nosso campos na tabela;
    static init(sequelize){
        super.init(
            {
                ra: DataTypes.STRING,
                nome: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING
            },
            {
                tableName: "tblAlunos",
                sequelize,

            }
        )

    }
    static associate(models){
        // console.log(models)
        this.hasMany(models.Question, { foreignKey: "aluno_id"});
        this.hasMany(models.Answer, { foreignKey: "student_id"})
        
    }
}

module.exports = Student;