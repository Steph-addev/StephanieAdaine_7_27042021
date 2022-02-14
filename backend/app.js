//Import pluggins to rule the APP
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

require("dotenv").config();

//Import files & folders
const db = require("./models"); //Only when need to update the database with sequelize
const usersRoute = require("./routes/userRoutes");
const postsRoute = require("./routes/postRoutes");
const authsRoute = require("./routes/authRoutes");

//Import variables
let corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type", "Authorization"],
  exposedHeaders: ["sessionId"],
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
};

//Automatic connection to database with sequelize
const { sequelize } = require("./models");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de donnée MySQL réussie!");
  })
  .catch((error) => {
    console.log("Connexion à la base de donnée MySQL échouée!", error);
  });

//What we need to run the app
const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API endpoints & routes for controllers
app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/auth", authsRoute);

//Images forlder access link
app.use("/images", express.static(path.join(__dirname, "images")));

//Only enable when updates on the database are needed
/* db.sequelize.sync({ force: true }).then((req) => {
  app.listen({ port: 3001 });
  console.log("Server is on!");
}); */

module.exports = app;
