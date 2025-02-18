const express = require("express");
const { connectDB } = require("./config/Database.js");
const User = require("./models/user.js");

const app = express();

app.post("/signup", async (req, res) => {
  const objnew = {
    firstName: "yashu",
    lastName: "verma",
    email: "yashu@gmail.com",
    password: "0707",
  };
  const user = new User(objnew);
  try {
    await user.save();
    res.send("data saved");
  } catch (err) {
    res.status(400).send("Data not save", +err.message);
  }
});

connectDB()
  .then(() => {
    console.log("database is connected");
    app.listen(7777, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.error("Database connot be connected" + err);
  });
