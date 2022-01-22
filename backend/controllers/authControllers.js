const { User } = require("../models");

exports.registration = (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  })
    .then((auth) => res.send(auth))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => res.send(user).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};
