const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { loginErrors, registrerErrors } = require("../utils/errorsUtils");
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
          console.log(valid);
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !", auth: false });
          }
          //generate the token on login
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
          console.log(err);
          res.status(200).send({ errors });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

/* exports.renewAuth = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.send("You need a token to access");
    next();
  }

  jwt.verify(token, process.env.HIDDEN_REFRESH_TOKEN, async (err, user) => {
    if (err) {
      res.locals.user = null;
      res.cookie("jwt", "", { maxAge: 1 });
      res.status(401).json({ auth: false, message: "The authentication has failed" });
      next();
    } else {
      let user = await User.findOne(user.id);
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !", auth: false });
      } else {
        delete user.iat;
        delete user.exp;
        const refreshToken = jwt.sign({ userId: user.id }, process.env.HIDDEN_REFRESH_TOKEN, { expiresIn: "20d" });
        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: maxAge });
        res.send("You are authenticated");
        next();
      }
    }
  });
}; */

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.send("You are disconnected");
  res.redirect("/");
};
