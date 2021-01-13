const Sequelize = require('sequelize');
const dbConfig = require("../config/database");

const Student = require("../models/Student")
const Question = require("../models/Question")
const Category = require("../models/Category")

const conex = new Sequelize(dbConfig);

Student.init(conex);
Question.init(conex);
Category.init(conex);

Student.associate(conex.models);
Question.associate(conex.models);
Category.associate(conex.models);

for (let assoc of Object.keys(Question.associations)) {
    for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
        console.log(Question.name + '.' + Question.associations[assoc].accessors[accessor] + '()');
    }
}