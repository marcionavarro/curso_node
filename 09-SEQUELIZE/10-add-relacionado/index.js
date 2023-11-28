const express = require("express");
const { engine } = require("express-handlebars");
const conn = require("./db/conn");

const User = require("./models/User");
const Address = require("./models/Address");

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

app.get("/users/create", (req, res) => {
  res.render("adduser");
});

app.post("/users/create", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  await User.create({ name, occupation, newsletter });
  res.redirect("/");
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });
  res.render("userview", { user });
});

app.get("/users/edit/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });
  res.render("useredit", { user });
});

app.post("/users/update", async (req, res) => {
  const body = req.body;

  const id = body.id;
  const name = body.name;
  const occupation = body.occupation;
  let newsletter = body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  const userData = { id, name, occupation, newsletter };

  await User.update(userData, { where: { id: id } });
  res.redirect("/");
});

app.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id: id } });
  res.redirect("/");
});

app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });
  res.render("home", { users: users });
});

app.post("/address/create", async (req, res) => {
  const body = req.body;

  const UserId = body.UserId;
  const street = body.street;
  const number = body.number;
  const city = body.city;

  const address = { UserId, street, number, city };

  await Address.create(address);
  res.redirect(`/users/edit/${UserId}`);
});

conn
  .sync()
  // .sync({force: true})
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => log(err));
