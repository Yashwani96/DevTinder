const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://YashwaniVerma:4Hxo3MdrsvlXWEX7@namastenode.pmgnk.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
