const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postControllers");
const commentsCtrl = require("../controllers/commentControllers");
const likesCtrl = require("../controllers/likeControllers");

//Routes for posts
router.post("/", postsCtrl.createPost);
router.get("/", postsCtrl.getAllPosts);
router.get("/:uuid", postsCtrl.getOnePost);
router.put("/:uuid", postsCtrl.modifyPost);
router.delete("/:uuid", postsCtrl.deletePost);

//Routes for comments
router.post("/comments", commentsCtrl.createComment);
router.get("/comments", commentsCtrl.getAllComments);
router.get("/comments/:uuid", commentsCtrl.getOneComment);
router.put("/comments/:uuid", commentsCtrl.modifyComment);
router.delete("/comments/:uuid", commentsCtrl.deleteComment);

// Routes for likes
router.post("/:uuid/like", likesCtrl.likePost);
router.post("/:uuid/dislike", likesCtrl.dislikePost);

module.exports = router;
