const { Like } = require("../models");

// Code à re-travailler après

exports.likePost = (req, res) => {
  Like.create({
    UserId: req.body.UserId,
    PostId: req.body.PostId,
  })
    .then((like) => res.send(like))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.dislikePost = (req, res) => {
  Like.create({
    UserId: req.body.UserId,
    PostId: req.body.PostId,
  })
    .then((like) => res.send(like))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};
