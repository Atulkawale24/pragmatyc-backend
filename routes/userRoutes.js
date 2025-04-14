const loginUser = require("../controllers/user/login");
const userRegistration = require("../controllers/user/userRegistration");

const userRoutes = require("express").Router();

userRoutes.post("/register-user", userRegistration);
userRoutes.post("/login", loginUser);

module.exports = userRoutes;