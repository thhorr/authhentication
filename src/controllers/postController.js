const express = require("express");

const router = express.Router();

const Post = require("../models/postModel");

const authenticate = require("../middlewares/authenticate");

router.post("/", authenticate, async function (req, res) {
  const post = await Post.create(req.body);

  return res.send({ post });
});

router.get("/", authenticate, async function (req, res) {
  const posts = await Post.find().lean().exec();
  const user = req.user;

  //delete user.password;
  return res.send({ posts, user });
});

module.exports = router;
