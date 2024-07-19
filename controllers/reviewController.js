// reviewController
const Review = require('../models/reviewModel');
const { validationResult } = require('express-validator');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const review = new Review(req.body);
  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findOne({ reviewId: req.params.id });
    if (review == null) {
      return res.status(404).json({ message: 'Cannot find review' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const review = await Review.findOneAndUpdate({ reviewId: req.params.id }, req.body, { new: true });
    if (review == null) {
      return res.status(404).json({ message: 'Cannot find review' });
    }
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ reviewId: req.params.id });
    if (review == null) {
      return res.status(404).json({ message: 'Cannot find Review' });
    }
    res.json({ message: 'Deleted Review' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
