const mongodb = require("../models/database");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
  //#swagger.tags=['Users']
  const result = await mongodb.getDatabase().db().collection("users").find();
  result
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
    });
};

const getUserById = async (req, res) => {
  //#swagger.tags=['Users']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid user id to update the student details.");
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .find({ _id: userId });
  result
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  const user_one = {
    user_id: req.body.user_id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    bio: req.body.bio
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .insertOne(user_one);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user.");
  }
};

const updateUser = async (req, res) => {
  console.log("Lusot sa authentication");
  //#swagger.tags=['Users']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must us a valid student id to update the student details.");
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    user_id: req.body.user_id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    bio: req.body.bio
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user.");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid user id to update the userdetails.");
  }
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json("Some error occurred while deleting the user.");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};






/* const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ user_id: req.params.id }, req.body, { new: true });
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ user_id: req.params.id });
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

*/
