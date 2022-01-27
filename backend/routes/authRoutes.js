const express = require("express");
const router = express.Router();
const authsCtrl = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddlewares");

router.post("/registrer", authsCtrl.registration);
router.post("/login", authsCtrl.login);
router.get("/logout", authsCtrl.logout);

module.exports = router;
