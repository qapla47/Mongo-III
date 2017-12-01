const mongoose = require("mongoose");

const User = require("../models/userModels");

const STATUS_USER_ERROR = 422;

const newUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });

  newUser
    .save()
    .then(createdUser => {
      res.json(createdUser);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json({ err });
      return;
    });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username, password })
    .select("username")
    .exec()
    .then(user => {
      if (user === null) throw new Error();
      res.json(user);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json({ err });
    });
};

module.exports = {
  newUser,
  loginUser
};
