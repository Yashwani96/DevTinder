const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.js");
const { validateSignUpData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  console.log(req.body); // Debugging log

  try {
    // Validate data before saving
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Save user to database
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    console.log(user);
    await user.save();

    res.status(201).send("Data saved successfully"); // ✅ Use a proper status code (201 = Created)
  } catch (err) {
    console.error(err); // Log the error for debugging

    res.status(400).json({ message: "Data not saved", error: err.message }); // ✅ Send JSON response
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      //create a JWT token
      const token = await user.getJWT();
      console.log(token);

      //Add the token to the cookie and send the response back to the user
      res.cookie("token", token);

      res.send("login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("logout successful");
});

module.exports = authRouter;
