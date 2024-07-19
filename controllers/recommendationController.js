// recommendationController
const Recom = require('../models/recommendationModel');
const { validationResult } = require('express-validator');

exports.getAllRecommendations = async (req, res) => {
  try {
    const recomms = await Recom.find();
    res.json(recomms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRecommendation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const recom = new Recom(req.body);
  try {
    const newRecom = await recom.save();
    res.status(201).json(newRecom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getRecommendationById = async (req, res) => {
  try {
    const recom = await Recom.findOne({ recommendationId: req.params.id });
    if (recom == null) {
      return res.status(404).json({ message: 'Cannot find recommendation' });
    }
    res.json(recom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRecommendation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const recom = await Recom.findOneAndUpdate({ recommendationId: req.params.id }, req.body, { new: true });
    if (recom == null) {
      return res.status(404).json({ message: 'Cannot find recommendation' });
    }
    res.json(recom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRecommendation = async (req, res) => {
  try {
    const recom = await Recom.findOneAndDelete({ recommendationId: req.params.id });
    if (recom == null) {
      return res.status(404).json({ message: 'Cannot find Recommendation' });
    }
    res.json({ message: 'Deleted Recommendation' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
