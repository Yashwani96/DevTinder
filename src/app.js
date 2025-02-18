const express = require("express");
const { connectDB } = require("./config/Database.js");
const User = require("./models/user.js");

const app = express();

app.use(express.json());

app.patch("/user", async (req, res) => {
  const id = req.body.id;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(id, data);
    res.send(" document updated");
  } catch (err) {
    res.status(400).send("not updated");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("successfully deleted");
  } catch (err) {
    res.status(400).send("something went wrong!");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.send("Data not found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send("Somethinf went wrong!");
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);

  const user = new User(req.body);
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
