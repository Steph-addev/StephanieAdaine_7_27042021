const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postControllers");
const commentsCtrl = require("../controllers/commentControllers");
const likesCtrl = require("../controllers/likeControllers");
const multer = require("../middlewares/multer-config");
/* const authsMiddleware = require("../middlewares/authMiddlewares"); */

//Routes for posts
router.post("/", multer, postsCtrl.createPost);
router.get("/", postsCtrl.getAllPosts);
router.get("/:id", postsCtrl.getOnePost);
router.put("/:id", postsCtrl.modifyPost);
router.delete("/:id", postsCtrl.deletePost);

//Routes for comments
router.patch("/comment-add/:id", commentsCtrl.addComment);
router.put("/comment-update/:id", commentsCtrl.modifyComment);
router.get("/comment-display/:id", commentsCtrl.getComments);
router.delete("/comment-delete/:id", commentsCtrl.deleteComment);

// Routes for likes
router.patch("/:id/like", likesCtrl.likePost);
router.post("/:id/dislike", likesCtrl.dislikePost);

module.exports = router;
