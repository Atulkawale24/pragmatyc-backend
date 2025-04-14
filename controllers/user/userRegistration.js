const userServices = require("../../services/userServices");
const {
  userRegisterValidation,
} = require("../../validations/user/userRegisterValidation");
const bcrypt = require('bcryptjs');

const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check validation
    const validationResult = await userRegisterValidation.validate({ name, email, password }, { abortEarly: true });
    if (validationResult.error) {
      return res.status(200).json({
        status: "FAILED",
        message: validationResult?.error?.details[0]?.message,
      });
    };

    //check is email exist or not
    const isEmailExist = await userServices.emailExist(email);
    if (isEmailExist) {
      res.status(200).json({
        status: "FAILED",
        message: "Email is already exist try with different email",
      });
      return
    }

    //hash password
    const hashPassword = await bcrypt.hashSync(password, 14);
    const dataToInsert = {
      name,
      email,
      password: hashPassword,
    };
    const result = await userServices.userRegistration(dataToInsert);
    if (result?._id) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "User Registered Successfully.",
      });
    } else {
      return res.status(401).json({
        status: "FAILED",
        message: "Failed to register user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "FAILED",
      message: error?.message,
    });
  }
};
module.exports = userRegistration;
