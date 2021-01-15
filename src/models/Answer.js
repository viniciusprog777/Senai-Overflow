const {Model, DataTypes} = require("sequelize");

class Answer extends Model {
    //aqui inicializamos os nosso campos na tabela;
    static init(sequelize){
        super.init(
            {
                description: DataTypes.STRING,
                student_id: DataTypes.INTEGER
               
            },
            {
                tableName: "tblAnswer",
                sequelize,

            }
        )

    }
    static associate(models){
        this.belongsTo(models.Question, { foreignKey: "question_id"});
        this.belongsTo(models.Student, { foreignKey: "student_id"});
    }
}

module.exports = Answer;