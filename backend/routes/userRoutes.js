//Import plugins and files
const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/userControllers");
const multer = require("../middlewares/multer-config");
const uploadCtrl = require("../controllers/uploadControllers");
const authMiddleware = require("../middlewares/authMiddlewares");

//Routes for users
router.post("/", authMiddleware, usersCtrl.createUser);
router.get("/", authMiddleware, usersCtrl.getAllUsers);
router.get("/:id", authMiddleware, usersCtrl.getOneUser);
router.put("/:id", authMiddleware, usersCtrl.modifyUser);
router.delete("/:id", authMiddleware, usersCtrl.deleteUser);

//Routes for uploads
router.post("/:id/upload", authMiddleware, uploadCtrl.uploadPicture);

module.exports = router;
