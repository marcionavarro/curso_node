const express = require("express");
const { engine } = require("express-handlebars");
const conn = require("./db/conn");

const app = express();
const log = console.log;

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000);
