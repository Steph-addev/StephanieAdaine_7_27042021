const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentControllers");

router.post("/", commentsCtrl.createComment);
router.get("/", commentsCtrl.getAllComments);
router.get("/:uuid", commentsCtrl.getOneComment);
router.put("/:uuid", commentsCtrl.modifyComment);
router.delete("/:uuid", commentsCtrl.deleteComment);

module.exports = router;
