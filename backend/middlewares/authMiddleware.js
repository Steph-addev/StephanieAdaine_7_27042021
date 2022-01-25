const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookie.jwt;
    const decodedToken = jwt.verify(token, process.env.HIDDEN_TOKEN);
    const userId = decodedToken.userId;
    console.log("ici", token, decodedToken);

    if (req.body.userId && req.body.userId !== userId) throw "Invalid user ID";
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request"),
    });
  }
};
