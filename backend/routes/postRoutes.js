const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postControllers");
const commentsCtrl = require("../controllers/commentControllers");
const likesCtrl = require("../controllers/likeControllers");
const multer = require("../middlewares/multer-config");
const authMiddleware = require("../middlewares/authMiddlewares");

//Routes for posts
router.post("/", authMiddleware, multer, postsCtrl.createPost);
router.get("/", authMiddleware, postsCtrl.getAllPosts);
router.get("/:id", authMiddleware, postsCtrl.getOnePost);
router.put("/:id", authMiddleware, postsCtrl.modifyPost);
router.delete("/:id", authMiddleware, postsCtrl.deletePost);

//Routes for comments
router.patch("/comment-add/:id", authMiddleware, commentsCtrl.addComment);
router.put("/comment-update/:id", authMiddleware, commentsCtrl.modifyComment);
router.get("/comment-display", authMiddleware, commentsCtrl.getComments);
/* router.get("/comment-display/:id", commentsCtrl.getOneComment); */
router.delete("/comment-delete/:id", authMiddleware, commentsCtrl.deleteComment);

// Routes for likes
router.patch("/:id/like", authMiddleware, likesCtrl.likePost);
router.post("/:id/dislike", authMiddleware, likesCtrl.dislikePost);

module.exports = router;
