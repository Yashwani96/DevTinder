const express = require("express");
const { connectDB } = require("./config/Database.js");
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");

const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      res.send("login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

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
