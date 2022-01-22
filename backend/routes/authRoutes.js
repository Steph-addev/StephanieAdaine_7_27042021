const express = require("express");
const router = express.Router();
const authsCtrl = require("../controllers/authControllers");

router.post("/", authsCtrl.registration);
router.get("/", authsCtrl.login);

module.exports = router;
