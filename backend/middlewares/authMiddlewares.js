const jwt = require("jsonwebtoken");

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
  } else {
    jwt.verify(token, process.env.HIDDEN_TOKEN, (err, decodedToken) => {
      if (err) {
        res.json({ auth: false, message: "The authentication has failed" });
      } else {
        req.userId = decodedToken.userId;
        res.send("You are authenticated");
        next();
      }
    });
  }
};
