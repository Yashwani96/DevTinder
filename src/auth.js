const jwt = require("jsonwebtoken");
const User = require("./models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decodeObj = await jwt.verify(token, "Devtinder@123");

    const { _id } = decodeObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("UserNot Found!");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
};

module.exports = { userAuth };
