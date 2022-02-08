/* const { Comment, Post, User } = require("../models");

exports.addComment = (req, res) => {
  Comment.create({
    UserId: req.body.UserId,
    PostId: req.body.PostId,
    content: req.body.content,
    likes: req.body.likes,
  })
    .then((comment) => res.send(comment).json({ message: "commentaire créé" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.modifyComment = (req, res) => {
  Comment.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Le commentaire a été modifié !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.deleteComment = (req, res) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Le commentaire a été supprimé !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.getComments = (req, res) => {
  Post.findOne({ where: { id: req.params.id } });
  Comment.findAll()
    .then((comments) => res.send(comments).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
}; */

/* exports.getOneComment = (req, res) => {
  Post.findOne({ where: { id: req.params.id } });
  Comment.findOne({include: User})
    .then((comments) => res.send(comments).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
}; */
