const { validationResult } = require("express-validator");

const fieldValidator = (req, res, next) => {
  const errors = validationResult(req);
  const stringErrors = errors
    .array()
    .map(({ msg }) => msg)
    .join(", ");
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped(),
      ok: false,
      msj: stringErrors,
    });
  }
  next();
};

module.exports = {
  fieldValidator,
};
