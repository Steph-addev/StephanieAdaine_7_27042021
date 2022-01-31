const { User } = require("../models");
const fs = require("fs");

exports.createUser = (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    adminRole: req.body.adminRole,
    department: req.body.name,
    workplace: req.body.firstname,
    profileImage: req.body.profileImage,
    profileDesc: req.body.profileDesc,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => res.send(users).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.getOneUser = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.send(user).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.deleteUser = (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "L'utilisateur a été supprimé !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.modifyUser = (req, res) => {
  User.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "L'utilisateur a été modifié !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};
