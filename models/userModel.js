const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: String,
  username: String,
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  bio: String
});

module.exports = mongoose.model('User', UserSchema);
