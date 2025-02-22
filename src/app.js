const express = require("express");
const { connectDB } = require("./config/Database.js");

const cookieParser = require("cookie-parser");
const profileRouter = require("./routes/profileRouter.js");
const authRouter = require("./routes/authRouter.js");
const requestRouter = require("./routes/requestRouter.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", authRouter);
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
