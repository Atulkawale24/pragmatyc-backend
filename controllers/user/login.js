const userServices = require("../../services/userServices");
const { loginValidation } = require("../../validations/user/loginValidation");
const bcrypt = require('bcryptjs');
const dotEnv = require("dotenv");
const generateToken = require("../../middleware/generate-token");
dotEnv.config();


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check validation
    const validationResult = await loginValidation.validate({ email, password }, { abortEarly: true });
    if (validationResult.error) {
      return response.status(200).json({
        status: "FAILED",
        message: validationResult?.error?.details[0]?.message,
      });
    };

    //Check user exist with this email
    const result = await userServices.userLogin(email);
    if (!result) {
      return res.status(200).json({
        status: "FAILED",
        message: "You are not accessible to this site",
      });
    }

    //compare password with password in database
    const comparePasswords = await bcrypt.compareSync(password, result.password);

    if (comparePasswords) {
      const userDetails = { id: result?._id, name: result?.name, email: result?.email, createdAt: result?.createdAt }
      const jwtToken = generateToken(userDetails);
      if (jwtToken) {
        res.status(200).json({
          status: "SUCCESS",
          message: "Login Successfully",
          jwtToken,
          userDetails,
        });
        return;
      }
    } else {
      res.status(401).json({
        status: "FAILED",
        message: "Invalid Credentials",
      });
      return;
    }
  } catch (error) {
    return res.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};
module.exports = loginUser;
