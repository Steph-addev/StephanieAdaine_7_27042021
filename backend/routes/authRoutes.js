const express = require("express");
const router = express.Router();
const authsCtrl = require("../controllers/authControllers");

router.post("/registrer", authsCtrl.registration);
router.post("/connection", authsCtrl.login);

module.exports = router;
