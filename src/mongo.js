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

const LogInCollection = new mongoose.model("LoginData", logInSchema);

module.exports = LogInCollection;
