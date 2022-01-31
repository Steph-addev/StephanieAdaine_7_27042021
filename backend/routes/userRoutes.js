const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/userControllers");
const multer = require("multer");
const upload = multer();
const uploadCtrl = require("../controllers/uploadControllers");

//Routes for users
router.post("/", usersCtrl.createUser);
router.get("/", usersCtrl.getAllUsers);
router.get("/:uuid", usersCtrl.getOneUser);
router.put("/:uuid", usersCtrl.modifyUser);
router.delete("/:uuid", usersCtrl.deleteUser);

//Routes for uploads
router.post("/:uuid/upload", upload.single("image"), uploadCtrl.uploadPicture);

module.exports = router;
