const User = require("../models/userModel");

class Auth {
  loginController = async (req, res, next) => {
    try {
      console.log("your logic here");
    } catch (error) {
      console.log(error);
    }
  };

  signupController = async (req, res, next) => {
    try {
      console.log("your logic here");
    } catch (error) {
      console.log(error);
    }
  };
}

const AuthClass = new Auth();
module.exports = { AuthClass };
