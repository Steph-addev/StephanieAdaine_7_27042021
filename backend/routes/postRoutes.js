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
router.patch("/comment-add/:id", commentsCtrl.addComment);
router.put("/comment-update/:id", commentsCtrl.modifyComment);
router.get("/comment-display/:id", commentsCtrl.getComments);
router.delete("/comment-delete/:id", commentsCtrl.deleteComment);

// Routes for likes
router.post("/:uuid/like", likesCtrl.likePost);
router.post("/:uuid/dislike", likesCtrl.dislikePost);

module.exports = router;
