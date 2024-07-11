const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  recommendationId: String,
  userId: String,
  bookIds: [String],
  date: String
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
