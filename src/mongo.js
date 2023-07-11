const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/LoginForm")
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("failed to connect the Mongodb");
  });

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const LogInCollection = mongoose.model("LoginData", logInSchema);
const ItemCollection = mongoose.model("ItemData", itemSchema);

module.exports = { LogInCollection, ItemCollection };
