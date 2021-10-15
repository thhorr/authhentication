const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validationResult } = require("express-validator");
const User = require("../models/userModel");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const Errors = errors.array().map((e) => {
      return {
        message: e.msg
      };
    });
    return res.status(400).send({ err: Errors });
  }

  let user;

  try {
    //  check if user with same email already exists
    user = await User.findOne({ email: req.body.email });

    //  throw an error that email already exists
    if (user)
      return res
        .status(400)
        .send({ message: "Please check your email and password" });

    // create the user with the email and password
  
    user = await User.create(req.body);

    //  create a token
    const token = newToken(user);

    //  send the token to the frontend
    return res.status(200).send({ user, token });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Regret" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const Errors = errors.array().map((e) => {
      return {
        message: e.msg
      };
    });
    return res.status(400).send({ err: Errors });
  }

  try {
    //  check if user with same email already exists
    let user = await User.findOne({ email: req.body.email });

    // if not exists throw an error
    if (!user)
      return res
        .status(400)
        .send({ message: "Please check your email and password" });

    // if exists then  match the password
    let match = user.checkPassword(req.body.password);

    // if not match then we throw an error
    if (!match)
      return res
        .status(400)
        .send({ message: "Please check your email and password" });

    //  create a token
    const token = newToken(user);

    //  send the token to the frontend
    return res.status(200).send({ user, token });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Regret" });
  }
};

module.exports = { register, login };
