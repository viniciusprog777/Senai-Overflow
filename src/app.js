require("./database")
//Importa o Expresss
const express = require('express');
//cria a aplicação express
const app = express();

const routes = require("./routes")

app.use(express.json());

app.use(routes);








module.exports = app;