const { User } = require("../models");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60 * 1000;

exports.registration = (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      const token = jwt.sign({ userId: user.uuid }, process.env.HIDDEN_TOKEN, { expiresIn: "24h" });
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
      console.log("Login réussie !");
      console.log("Création du token = ", token);
      res.status(200).json({
        userId: user.uuid,
        token: token,
      });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};
