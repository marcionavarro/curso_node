const express = require("express");
const { engine } = require("express-handlebars");
const mysql = require("mysql2");

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

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;
  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/");
  });
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
