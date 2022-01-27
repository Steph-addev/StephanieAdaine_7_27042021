const { Post } = require("../models");

exports.createPost = (req, res) => {
  Post.create({
    UserId: req.body.UserId,
    title: req.body.title,
    content: req.body.content,
    images: req.body.images,
    likes: req.body.likes,
  })
    .then((post) => res.send(post))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.getAllPosts = (req, res) => {
  Post.findAll()
    .then((posts) => res.send(posts).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.getOnePost = (req, res) => {
  Post.findOne({ where: { uuid: req.params.uuid } })
    .then((post) => res.send(post).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.deletePost = (req, res) => {
  Post.destroy({ where: { uuid: req.params.uuid } })
    .then(() => res.status(200).json({ message: "Le post a été supprimé !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.modifyPost = (req, res) => {
  Post.update({ ...req.body.content }, { where: { uuid: req.params.uuid } })
    .then(() => res.status(200).json({ message: "Le post a été modifié !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};
