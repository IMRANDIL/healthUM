const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class Auth {
  loginController = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ msg: "All Fields required!", success: false });
    }
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res
          .status(404)
          .send({ msg: "User does not exist!", success: false });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(400)
          .send({ msg: "Invalid Credentials!", success: false });
      }
      res.status(200).json({
        email: user.email,
        success: true,
        msg: "Login Successful!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error, success: false });
    }
  };

  signupController = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ msg: `All Fields are required!`, success: false });
    }

    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        return res
          .status(400)
          .send({ msg: `User Already Exists!`, success: false });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      await User.create({
        name: name,
        email: email,
        password: hashPassword,
      });
      res.status(201).send({ msg: "Signup successful!", success: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error, success: false });
    }
  };
}

const AuthClass = new Auth();
module.exports = { AuthClass };
