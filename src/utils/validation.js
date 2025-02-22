const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not Valid!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a Strong Password!");
  }
};

const validateEditProfileData = (req) => {
  const isAllowed = ["firstName", "lastName", "age"];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    isAllowed.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
