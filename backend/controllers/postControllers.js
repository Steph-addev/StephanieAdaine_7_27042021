const { Post } = require("../models");
const { uploadErrors } = require("../utils/errorsUtils");
/* const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline); */

exports.createPost = async (req, res) => {
  /*   let fileName;

  if (req.file !== null) {
    try {
      if (req.file.detectedMimeType != "image/jpg" && req.file.detectedMimeType != "image/png" && req.file.detectedMimeType != "image/jpeg") throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
      /*   const fileName = req.body.postId + "posts" + Date.now() + "jpg";
 await pipeline(req.file.stream, fs.createWriteStream(`${__dirname}../../images/posts/${fileName}`)); 
  } */
  /* 
  const fileName = req.file.filename + "posts" + Date.now() + ".jpg"; */

  const addPost = new Post({
    UserId: req.body.UserId,
    content: req.body.content,
    images: req.file === null ? "" : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: req.body.likes,
  });
  try {
    const post = await addPost.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
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
