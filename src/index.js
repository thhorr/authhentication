const express = require("express");

const { register, login } = require("./controllers/authController");
const postController = require("./controllers/postController");
const { body } = require("express-validator");

const app = express();

app.use(express.json());

app.post(
  "/register",
  body("name").notEmpty().withMessage("First Name is required"),
  body("email").custom((value) => {
    if (!value) {
      throw new Error("EMAIL is required");
    }

    let valid =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!valid.test(value)) {
      throw new Error("Invaild Email Id");
    }

    return true;
  }),
  body("password").custom((value) => {
    if (!value) {
      throw new Error("Password is required");
    }

    if (value.length < 5) {
      throw new Error("Password must have at least 5 characters");
    }

    return true;
  }),
  register
);

app.post(
  "/login",
  body("email").custom((value) => {
    if (!value) {
      throw new Error("EMAIL is required");
    }

    let valid =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!valid.test(value)) {
      throw new Error("Invaild Email Id");
    }

    return true;
  }),
  body("password").custom((value) => {
    if (!value) {
      throw new Error("Password is required");
    }

    if (value.length < 5) {
      throw new Error("Password must have at least 5 characters");
    }

    return true;
  }),
  login
);

app.use("/posts", postController);

module.exports = app;
