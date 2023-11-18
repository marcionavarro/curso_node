const express = require("express");
// const exphbs = require("express-handlebars"); // Version 5.3.3
const { engine } = require('express-handlebars');

const app = express();

// app.engine("handlebars", exphbs()); // Version 5.3.3
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("home", { layout: false });
});

app.listen(3000, () => {
    console.log(`App funcionando!`)
});
