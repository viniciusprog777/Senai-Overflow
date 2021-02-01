require("./database");
//Importa o Expresss

const cors = require("cors");
const { errors } = require("celebrate");

const express = require("express");
//cria a aplicação express
const app = express();

const routes = require("./routes");

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("./src/uploads"));

app.use(routes);

app.use(errors());

module.exports = app;
