const app = require("./app");
//porta usada pelo servidor
const port = process.env.PORT || 3333;

//subindo o servidor na web
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
