/* const { Like, Post } = require("../models");

// Code à re-travailler après

// Constants
const DISLIKED = 0;
const LIKED = 1;

// Routes
exports.likePost = (req, res) => {
  // Params
  var postId = parseInt(req.params.postId);
  if (postId <= 0) {
    return res.status(400).json({ error: "invalid parameters" });
  }


  asyncLib
    .waterfall(
      [
        // Function start : looking for the post message
        function (done) {
          Post.findOne({
            where: { id: req.params.id },
          })
            .then(function (messageFound) {
              done(null, messageFound);
            })
            .catch(function (err) {
              return res.status(500).json({ error: "message not found" });
            });
        },

        // If post message is found then looking for the user
        function (messageFound, done) {
          if (messageFound) {
            User.findOne({
              where: { id: req.params.id },
            })
              .then(function (userFound) {
                done(null, messageFound, userFound);
              })
              .catch(function (err) {
                return res.status(500).json({ error: "user not found" });
              });
          } else {
            res.status(404).json({ error: "post already liked" });
          }
        },

        //Check if the user already liked the post 
        function (messageFound, userFound, done) {
          if (userFound) {
            Like.findOne({
              where: {
                UserId: req.body.UserId,
                PostId: req.body.PostId,
              },
            })
              .then(function (userAlreadyLikedFound) {
                done(null, messageFound, userFound, userAlreadyLikedFound);
              })
              .catch(function (err) {
                return res.status(500).json({ error: "user's like not found" });
              });
          } else {
            res.status(404).json({ error: "user don't exist" });
          }
        },

        //If the user has not liked the post yet, adding a like or remove it if already liked
        function (messageFound, userFound, userAlreadyLikedFound, done) {
          if (!userAlreadyLikedFound) {
            messageFound
              .addUser(userFound, { isLike: LIKED })
              .then(function (alreadyLikeFound) {
                done(null, messageFound, userFound);
              })
              .catch(function (err) {
                return res.status(500).json({ error: "unable to set user reaction" });
              });
          } else {
            if (userAlreadyLikedFound.isLike === DISLIKED) {
              userAlreadyLikedFound
                .update({
                  isLike: LIKED,
                })
                .then(function () {
                  done(null, messageFound, userFound);
                })
                .catch(function (err) {
                  res.status(500).json({ error: "cannot update user reaction" });
                });
            } else {
              res.status(409).json({ error: "message already liked" });
            }
          }
        },
        function (messageFound, userFound, done) {
          messageFound
            .update({
              likes: messageFound.likes + 1,
            })
            .then(function () {
              done(messageFound);
            })
            .catch(function (err) {
              res.status(500).json({ error: "cannot update message like counter" });
            });
        },
      ],
      function (messageFound) {
        if (messageFound) {
          return res.status(201).json(messageFound);
        } else {
          return res.status(500).json({ error: "cannot update message" });
        }
      }
    )
    .catch((error) => res.status(500).json({ error }));
}; */

exports.likePost = (req, res) => {
  Post.findOne({ where: { id: req.params.id } }, { where: { likes: req.body.likes } })
    .then(() => {
      Like.create({
        UserId: req.body.UserId,
        PostId: req.body.PostId,
        likeNumber: req.body.likeNumber,
      })
        .then((like) => {
          (likeNumber = 1), res.send(like);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    })
    .catch((error) => res.status(400).json({ error }));
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
