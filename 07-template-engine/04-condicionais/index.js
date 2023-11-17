const express = require("express");
// const exphbs = require("express-handlebars"); // Version 5.3.3
const { engine } = require("express-handlebars");

const app = express();

// app.engine("handlebars", exphbs()); // Version 5.3.3
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/", (req, res) => {
  const user = {
    name: "Marcio",
    surname: "Navarro",
    age: 40
  };

  const auth = false;

  res.render("home", { user: user, auth });
});

app.listen(3000, () => {
  console.log(`App funcionando!`);
});
