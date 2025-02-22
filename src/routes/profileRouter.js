const express = require("express");
const { userAuth } = require("../auth");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

profileRouter.patch("/profile/Edit", userAuth, async (req, res) => {
  try {
    validateEditProfileData(req);
    if (!validateEditProfileData) {
      throw new Error("Invalid Edit Data");
    } else {
      loggedInUser = req.user;
      Object.keys(req.body).forEach(
        (key) => (loggedInUser[key] = req.body[key])
      );
      await loggedInUser.save();
      res.send(loggedInUser);
    }
  } catch (err) {
    res.status(400).send("Error: ", err.message);
  }
});

module.exports = profileRouter;
