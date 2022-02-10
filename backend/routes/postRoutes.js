//Import plugins and files
const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postControllers");
const multer = require("../middlewares/multer-config");
const authMiddleware = require("../middlewares/authMiddlewares");

//Routes for posts
router.post("/", authMiddleware, multer, postsCtrl.createPost);
router.get("/", authMiddleware, postsCtrl.getAllPosts);
router.get("/:id", authMiddleware, postsCtrl.getOnePost);
router.put("/:id", authMiddleware, postsCtrl.modifyPost);
router.delete("/:id", authMiddleware, postsCtrl.deletePost);

//Routes for comments
router.patch("/comment-add/:id", authMiddleware, postsCtrl.addComment);
router.put("/comment-update/:id", authMiddleware, postsCtrl.modifyComment);
router.get("/comment-display/:id", authMiddleware, postsCtrl.getOneComment);
router.get("/:id/comments", authMiddleware, postsCtrl.getAllComments);
router.delete("/comment-delete/:id", authMiddleware, postsCtrl.deleteComment);

module.exports = router;
