const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  /*   try {

    const decodedToken = jwt.verify(token, process.env.HIDDEN_TOKEN);
    const userId = decodedToken.userId;
    console.log("authMidd:", userId);

    if (req.body.userId && req.body.userId !== userId) throw "Invalid user ID";
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request"),
    });
  } */

  if (!token) {
    res.send("You need a token to access");
    next();
  } else {
    jwt.verify(token, process.env.HIDDEN_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        res.json({ auth: false, message: "The authentication has failed" });
        next();
      } else {
        let user = await User.findAll(decodedToken.id);
        res.locals.user = user;
        console.log("tu es connecté");
        res.send("You are authenticated");
        next();
      }
    });
  }
};
