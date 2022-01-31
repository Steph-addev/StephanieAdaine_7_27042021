const { Post } = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

exports.createPost = async (req, res) => {
  /*   try {
    //Check of the image's format
    if (req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/jpeg" && req.file.detectedMimeType !== "image/png") throw "invalid image format";
    //Check of the image's size
    if (req.file.size > 500000) throw "image too heavy";
  } catch (err) {
    return res.status(201).json(err);
  }
 */
  const fileName = req.body.postId + "posts" + Date.now() + "jpg";
  /*  await pipeline(req.file.stream, fs.createWriteStream(`${__dirname}../../images/posts/${fileName}`)); */

  Post.create({
    UserId: req.body.UserId,
    content: req.body.content,
    images: req.file !== null ? `${req.protocol}://${req.get("host")}/images/${fileName}` : "",
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
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => res.send(post).json())
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.deletePost = (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Le post a été supprimé !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.modifyPost = (req, res) => {
  Post.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Le post a été modifié !" }))
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};
