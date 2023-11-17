const express = require("express");
const app = express();
const port = 3000; // variavel ambiente

const path = require("path");
const basePath = path.join(__dirname, "templates");

const log = console.log;

const checkAuth = function (req, res, next) {
  req.authStatus = true;

  if (!req.authStatus) {
    log("Não está logado! Faça login para continuar");
    next();
  }

  log("Está logado! Pode continuar");
  next();
};

app.use(checkAuth);


app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
