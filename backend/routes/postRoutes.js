const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postControllers");

router.post("/", postsCtrl.createPost);
router.get("/", postsCtrl.getAllPosts);
router.get("/:uuid", postsCtrl.getOnePost);
router.put("/:uuid", postsCtrl.modifyPost);
router.delete("/:uuid", postsCtrl.deletePost);

module.exports = router;
