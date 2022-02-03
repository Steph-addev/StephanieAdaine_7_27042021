const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/userControllers");
const multer = require("../middlewares/multer-config");
const uploadCtrl = require("../controllers/uploadControllers");
/* const authMiddleware = require("../middlewares/authMiddlewares"); */

//Routes for users
router.post("/", usersCtrl.createUser);
router.get("/", usersCtrl.getAllUsers);
router.get("/:id", usersCtrl.getOneUser);
router.put("/:id", usersCtrl.modifyUser);
router.delete("/:id", usersCtrl.deleteUser);

//Routes for uploads
router.post("/:id/upload", multer, uploadCtrl.uploadPicture);

module.exports = router;
