// Middleware pour ajouter des images dans le formulaire
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === "posts") {
      callback(null, "./images/posts/");
    } else if (file.fieldname === "profile") {
      callback(null, "./images/profils/");
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).fields([{ name: "profile" }, { name: "posts" }]);
