const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const verifyJwtToken = async (req, res, next) => {
  try {
    const authHeader = req.header('authorization');
    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, userObject) => {
        if (err) {
          res.status(200).json({
            status: "JWT_INVALID",
            message: "Your session has ended. Please login again."
          });
          return;
        } else {
          req._id = userObject.id;
          const doesUserExist = await userServices.getUserById(userObject?.id);
          if (!doesUserExist) {
            res.status(200).json({
              status: "JWT_INVALID",
              message: "Your session has ended. Please login again."
            });
            return;
          };
          req._id = doesUserExist?._id?.toString();
        }
        next();
      });
    } else {
      res.status(200).json({
        status: "JWT_INVALID",
        message: "Your session has ended. Please login again."
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.message
    });
    return;
  }
};

module.exports = verifyJwtToken;