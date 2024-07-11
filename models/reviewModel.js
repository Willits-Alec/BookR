const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  reviewId: String,
  userId: String,
  bookId: String,
  rating: Number,
  reviewText: String,
  date: String
});

module.exports = mongoose.model('Review', ReviewSchema);
