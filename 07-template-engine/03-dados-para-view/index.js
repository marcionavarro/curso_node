const express = require("express");
// const exphbs = require("express-handlebars"); // Version 5.3.3
const { engine } = require("express-handlebars");

const app = express();

// app.engine("handlebars", exphbs()); // Version 5.3.3
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const user = {
    name: "Marcio",
    surname: "Navarro",
    age: 40
  };

  const palavra = 'Teste'

  res.render("home", { user: user, palavra });
});

app.listen(3000, () => {
  console.log(`App funcionando!`);
});
