const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/userControllers");

router.post("/", usersCtrl.createUser);
router.get("/", usersCtrl.getAllUsers);
router.get("/:uuid", usersCtrl.getOneUser);
router.put("/:uuid", usersCtrl.modifyUser);
router.delete("/:uuid", usersCtrl.deleteUser);

module.exports = router;
