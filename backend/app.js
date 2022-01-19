//Import pluggins
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

//Import files & folders
const db = require("./models");
const usersRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postRoutes");
const commentsRoutes = require("./routes/commentRoutes");

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
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);

db.sequelize.sync({ force: true }).then((req) => {
  app.listen({ port: 3001 });
  console.log("Server is on!");
});

module.exports = app;
