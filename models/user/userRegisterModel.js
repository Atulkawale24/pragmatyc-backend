const mongoose = require("mongoose");

const userRegisterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //Adding entry time to the database
  }
);

const registerUser = mongoose.model("users", userRegisterSchema);
module.exports = registerUser;
