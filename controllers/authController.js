const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class Auth {
  loginController = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All Fields required!");
    }
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(404).send("User does not exist!");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).send("Invalid Credentials!");
      }
      res.status(200).json({
        email: user.email,
        success: true,
        msg: "Login Successful!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  signupController = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send(`All Fields are required!`);
    }

    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        return res.status(400).send(`User Already Exists!`);
      }
      const hashPassword = await bcrypt.hash(password, 12);
      await User.create({
        name: name,
        email: email,
        password: hashPassword,
      });
      res.status(201).send("Signup successful!");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
}

const AuthClass = new Auth();
module.exports = { AuthClass };
