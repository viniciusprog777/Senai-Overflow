const Sequelize = require('sequelize');
const dbConfig = require("../config/database");

const Student = require("../models/Student")
const Question = require("../models/Question")

const conex = new Sequelize(dbConfig);

Student.init(conex);
Question.init(conex);

Student.associate(conex.models);
Question.associate(conex.models);