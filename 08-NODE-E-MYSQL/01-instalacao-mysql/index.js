const express = require("express");
const { engine } = require("express-handlebars");
const mysql = require("mysql2");

const app = express();
const log = console.log;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "nodemysql"
});

conn.connect(function (err) {
  if (err) {
    log(err);
  }
  log("Conectou ao MySQL!");
  app.listen(3000);
});
