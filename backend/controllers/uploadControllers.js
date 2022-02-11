const { User } = require("../models");
const { uploadErrors } = require("../utils/errorsUtils");

module.exports.uploadPicture = async (req, res, next) => {
  try {
    if (req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg") throw Error("invalid file");
    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  User.findOne({ where: { id: req.params.id } })
    .then((User) => {
      User.update({ profileImage: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` })
        .then(() => res.status(200).json({ message: "La photo de profil a été uploadé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        next();
      }
    });
};
