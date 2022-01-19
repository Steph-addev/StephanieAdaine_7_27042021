const { Comment } = require("../models");

exports.createComment = (req, res) => {
  Comment.create({
    UserId: req.body.UserId,
    PostId: req.body.PostId,
    content: req.body.content,
    likes: req.body.likes,
  })
    .then((comment) => res.send(comment))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.getAllComments = (req, res) => {
  Comment.findAll()
    .then((comments) => res.send(comments).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.getOneComment = (req, res) => {
  Comment.findOne({ where: { uuid: req.params.uuid } })
    .then((comment) => res.send(comment).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.deleteComment = (req, res) => {
  Comment.destroy({ where: { uuid: req.params.uuid } })
    .then(() => res.status(200).json({ message: "Le commentaire a été supprimé !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.modifyComment = (req, res) => {
  Comment.update({ ...req.body }, { where: { uuid: req.params.uuid } })
    .then(() => res.status(200).json({ message: "Le commentaire a été modifié !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};
