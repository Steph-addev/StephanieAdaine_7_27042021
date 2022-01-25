const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/userControllers");
const auth = require("../middlewares/authMiddleware");
const multer = require("../middleware/multer-config");

router.post("/", usersCtrl.createUser);
router.get("/", usersCtrl.getAllUsers);
router.get("/:uuid", usersCtrl.getOneUser);
router.put("/:uuid", multer, usersCtrl.modifyUser);
router.delete("/:uuid", usersCtrl.deleteUser);

module.exports = router;
