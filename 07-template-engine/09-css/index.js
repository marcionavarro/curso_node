const express = require("express");
// const exphbs = require("express-handlebars"); // Version 5.3.3
const { engine } = require("express-handlebars");

const app = express();

// app.engine("handlebars", exphbs()); // Version 5.3.3
app.engine("handlebars", engine({ partialsDir: ["views/partials"] }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/dashboard", (req, res) => {
  const items = ["Item a", "Item b", "Item c"];
  res.render("dashboard", { items });
});

app.get("/post", (req, res) => {
  const post = {
    title: "Aprender NodeJs",
    category: "JavaScript",
    body: "Este artigo vai te ajudar a aprender NodeJs",
    comments: 4
  };

  res.render("blogpost", { post });
});

app.get("/blog", (req, res) => {
  const posts = [
    {
      title: "Aprender NodeJs",
      category: "JavaScript",
      body: "Teste",
      comments: 4
    },
    {
      title: "Aprender ReactJs",
      category: "JavaScript",
      body: "New Body",
      comments: 3
    },
    {
      title: "Aprender PHP",
      category: "PHP",
      body: "Teste",
      comments: 8
    }
  ];

  res.render("blog", { posts });
});

app.get("/", (req, res) => {
  const user = {
    name: "Marcio",
    surname: "Navarro",
    age: 40
  };

  const auth = false;
  const approved = true;

  res.render("home", { user: user, auth, approved });
});

app.listen(3000, () => {
  console.log(`App funcionando!`);
});
