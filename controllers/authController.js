const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Auth {
  loginController = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ msg: "All Fields required!", success: false });
    }
    try {
      const user = await User.findOne({ email: req.body.email.toLowerCase() });
      if (!user) {
        return res
          .status(404)
          .send({ msg: "User does not exist!", success: false });
      }
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch) {
        return res
          .status(400)
          .send({ msg: "Invalid Credentials!", success: false });
      }
      const jwtToken = await jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({
        email: user.email,
        success: true,
        msg: "Login Successful!",
        token: jwtToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Something went wrong!", success: false });
    }
  };

  signupController = async (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ msg: `All Fields are required!`, success: false });
    }

    try {
      const user = await User.findOne({ email: req.body.email.toLowerCase() });
      if (user) {
        return res
          .status(400)
          .json({ msg: `User Already Exists!`, success: false });
      }
      const hashPassword = await bcrypt.hash(req.body.password, 12);
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });
      res.status(201).json({ msg: "Signup successful!", success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went Wrong", success: false });
    }
  };

  getUserInfoController = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({
          msg: "User Not Found!",
          success: false,
        });
      }
      res.status(200).json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Something Went wrong",
        success: false,
      });
    }
  };
}

const AuthClass = new Auth();
module.exports = { AuthClass };
