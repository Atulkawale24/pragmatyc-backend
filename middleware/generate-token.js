const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();
const secretKey = process.env.JWT_SECRET_KEY;
module.exports = function generateUserJwt(isUserExist) {
    return jwt.sign(isUserExist, secretKey, { expiresIn: process.env.JWT_EXPIRE_TIME });
};
