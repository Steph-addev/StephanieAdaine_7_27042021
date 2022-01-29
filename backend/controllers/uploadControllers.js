const { User } = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadPicture = async (req, res, next) => {
  try {
    //Check of the image's format
    if (req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/jpeg" && req.file.detectedMimeType !== "image/png") throw "invalid image format";
    //Check of the image's size
    if (req.file.size > 500000) throw "image too heavy";
  } catch (err) {
    return res.status(201).json(err);
  }

  const fileName = req.body.username + ".jpg";
  const filePath = await pipeline(req.file.stream, fs.createWriteStream(`${__dirname}../../images/${fileName}`));

  console.log(filePath);

  User.findOne({ where: { id: req.params.id } })
    .then((User) => {
      User.update({ profileImage: `${req.protocol}://${req.get("host")}/images/${fileName}` })
        .then(() => res.status(200).redirect(process.env.CLIENT_URL + "/profil"))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        next();
      }
    });
};
