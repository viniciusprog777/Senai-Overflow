const {Model, DataTypes} = require("sequelize");

class Question extends Model {
    //aqui inicializamos os nosso campos na tabela;
    static init(sequelize){
        super.init(
            {
                titulo: DataTypes.STRING,
                descricao: DataTypes.STRING,
                imagem: DataTypes.STRING,
                gist: DataTypes.STRING
            },
            {
                tableName: "tblPerguntas",
                sequelize,

            }
        )

    }
    static associate(models){
        this.belongsTo(models.Student, { foreignKey: "aluno_id"});
        this.belongsToMany(models.Category, {through: "tblquestion_category"});
        this.hasMany(models.Answer, { foreignKey: "question_id"})
    }
}

module.exports = Question;