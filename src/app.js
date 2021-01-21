require("./database")
//Importa o Expresss
const express = require('express');
//cria a aplicação express
const app = express();

const routes = require("./routes");
const { errors } = require("celebrate");

app.use(express.json());

app.use(routes);

app.use(errors());






module.exports = app;