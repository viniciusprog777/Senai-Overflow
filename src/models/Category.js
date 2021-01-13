const {Model, DataTypes} = require("sequelize");

class Category extends Model {
    //aqui inicializamos os nosso campos na tabela;
    static init(sequelize){
        super.init(
            {
                description: DataTypes.STRING,
               
            },
            {
                tableName: "tblCategory",
                sequelize,

            }
        )

    }
    static associate(models){
        this.belongsToMany(models.Question, {through: "tblquestion_category"})

    }
}

module.exports = Category;