const { Model, DataTypes } = require("sequelize");

class Question extends Model {
  //aqui inicializamos os nosso campos na tabela;
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        gist: DataTypes.STRING,
      },
      {
        tableName: "tblquestion",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: "student_id" });
    this.belongsToMany(models.Category, { through: "tblquestion_category" });
    this.hasMany(models.Answer, { foreignKey: "question_id" });
  }
}

module.exports = Question;
