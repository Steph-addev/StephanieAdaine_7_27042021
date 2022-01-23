const { User } = require("../models");

exports.createUser = (req, res) => {
  User.create({
    adminRole: req.body.adminRole,
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
  User.findOne({ where: { uuid: req.params.uuid } })
    .then((user) => res.send(user).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.deleteUser = (req, res) => {
  User.destroy({ where: { uuid: req.params.uuid } })
    .then(() => res.status(200).json({ message: "L'utilisateur a été supprimé !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.modifyUser = (req, res) => {
  User.update({ ...req.body }, { where: { uuid: req.params.uuid } })
    .then(() => res.status(200).json({ message: "L'utilisateur a été modifié !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};