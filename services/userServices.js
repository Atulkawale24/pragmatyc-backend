const registerUser = require("../models/user/userRegisterModel");
const { ObjectId } = require("mongodb");

const userServices = {
  userRegistration: async (dataToInsert) => {
    try {
      return await registerUser.create(dataToInsert);
    } catch (error) {
      throw error;
    }
  },
  userLogin: async (email) => {
    try {
      return await registerUser.findOne({ email });
    } catch (error) {
      throw error;
    }
  },
  emailExist: async (email) => {
    try {
      return await registerUser.findOne({ email });
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (id) => {
    try {
      return await registerUser.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw error;
    }
  },
};
module.exports = userServices;
