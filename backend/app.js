//Import pluggins
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

//Import files & folders
const db = require("./models");
const { User } = require("./models");

let corsOptions = {
  origin: "https//localhost:8081",
};

//Connexion automatique à la database avec sequelize
const { sequelize } = require("./models");
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de donnée MySQL réussie!");
  })
  .catch((error) => {
    console.log("Connexion à la base de donnée MySQL échouée!", error);
  });

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

//Endpoints & Controllers
app.post("/users", (req, res) => {
  User.create({
    login: req.body.login,
    password: req.body.password,
    adminRole: req.body.adminRole,
    username: req.body.username,
    name: req.body.name,
    firstname: req.body.firstname,
    profileImage: req.body.profileImage,
    profileDesc: req.body.profileDesc,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

app.get("/users", (req, res) => {
  User.findAll()
    .then((users) => res.send(users).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

app.get("/users/:uuid", (req, res) => {
  User.findOne({ where: { uuid: req.params.uuid } })
    .then((user) => res.send(user).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

app.delete("/users/:uuid", (req, res) => {
  User.destroy({ where: { uuid: req.params.uuid } })
    .then(() => res.status(200).json({ message: "L'utilisateur a été supprimé !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

app.put("/users/:uuid", (req, res) => {
  User.update({ ...req.body }, { where: { uuid: req.params.uuid } })
    .then(() => res.status(200).json({ message: "L'utilisateur a été modifié !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

db.sequelize.sync({ force: true }).then((req) => {
  app.listen({ port: 3001 });
  console.log("Server is on!");
});

module.exports = app;
