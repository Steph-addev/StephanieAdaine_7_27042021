const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postControllers");
const commentsCtrl = require("../controllers/commentControllers");
const multer = require("../middleware/multer-config");

//Routes pour posts
router.post("/", multer, postsCtrl.createPost);
router.get("/", postsCtrl.getAllPosts);
router.get("/:uuid", postsCtrl.getOnePost);
router.put("/:uuid", multer, postsCtrl.modifyPost);
router.delete("/:uuid", postsCtrl.deletePost);

//Routes pour comments
router.post("/comments", commentsCtrl.createComment);
router.get("/comments", commentsCtrl.getAllComments);
router.get("/comments/:uuid", commentsCtrl.getOneComment);
router.put("/comments/:uuid", commentsCtrl.modifyComment);
router.delete("/comments/:uuid", commentsCtrl.deleteComment);

module.exports = router;
