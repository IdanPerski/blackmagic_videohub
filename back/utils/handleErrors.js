const txtColor = require("../helpers/chalk/color");

const handleError = (res, status, message = "") => {
  console.log(txtColor.danger(`handelig error ${status}`));
  console.log(txtColor.danger(`message:${message}`));

  // console.log(txtColor.lemon(res.status(status)));
  return res.status(status).send(message);
};

const createError = (validator, error) => {
  errorMessage = `${validator} Error: ${error.message}`;
  error.message = errorMessage;
  error.status = error.status || 400;
  console.log(error);
  throw Promise.reject();
};

module.exports = { handleError, createError };
