//Import plugins
const express = require("express");
const router = express.Router();
const authsCtrl = require("../controllers/authControllers");

router.post("/registrer", authsCtrl.registration);
router.post("/login", authsCtrl.login);
router.get("/logout", authsCtrl.logout);

module.exports = router;
