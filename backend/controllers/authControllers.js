const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60 * 1000;

exports.registration = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then(function (userFound) {
      if (!userFound) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            User.create({
              email: req.body.email,
              password: hash,
              username: req.body.username,
            })
              .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
              .catch((err) => {
                const errors = registrerErrors(err);
                res.status(200).send({ errors });
              });
          })
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(409).json({ error: "L'utilisateur existe déjà" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !", auth: false });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !", auth: false });
          }
          const token = jwt.sign({ userId: user.id }, process.env.HIDDEN_TOKEN, { expiresIn: maxAge });
          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
          console.log("Login réussie !");
          console.log("Création du token = ", token);
          console.log(user.id);
          res.status(200).json({
            auth: true,
            userId: user.id,
            token: token,
          });
        })
        .catch((err) => {
          const errors = loginErrors(err);
          res.status(200).send({ errors });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send("You are disconnected");
  res.redirect("/");
};
