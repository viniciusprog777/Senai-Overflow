const {Model, DataTypes} = require("sequelize");

class Student extends Model {
    //aqui inicializamos os nosso campos na tabela;
    static init(sequelize){
        super.init(
            {
                ra: DataTypes.STRING,
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING
            },
            {
                tableName: "tblStudent",
                sequelize,

            }
        )

    }
    static associate(models){
        // console.log(models)
        this.hasMany(models.Question, { foreignKey: "student_id"});
        this.hasMany(models.Answer, { foreignKey: "student_id"})
        
    }
}

module.exports = Student;