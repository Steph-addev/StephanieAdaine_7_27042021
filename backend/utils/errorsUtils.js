exports.registrerErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "L'email existe déjà";

  if (err.message.includes("password")) errors.password = "Le mot de passe est incorrect";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) errors.email = "Cet email existe déjà";

  return errors;
};

exports.loginErrors = (err) => {
  let errors = { username: "", email: "", password: "" };

  if (err.message.includes("username")) errors.username = "Ce nom de profil existe déjà";

  if (err.message.includes("email")) errors.email = "Cet email est incorrect";

  if (err.message.includes("password")) errors.password = "Ce mot de passe n'est pas assez long";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file")) errors.format = "Format incompatabile";

  if (err.message.includes("max size")) errors.maxSize = "Le fichier dépasse 500ko";

  return errors;
};
