const express = require("express");

const app = express();

const { adminAuth } = require("./auth.js");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("all data");
});

app.get("/admin/deleteData", (req, res) => {
  res.send("data is Deleted");
});

app.listen(7777, () => {
  console.log("server is running");
});

// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("this is the home page");
// });

// app.get("/about", (req, res) => {
//   res.send("about page");
// });

// app.get("/test", (req, res) => {
//   res.send("testing page");
// });

// app.listen(7777, () => {
//   console.log("server is running");
// });
