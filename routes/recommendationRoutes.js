// recommendationRoutes.js
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.get('/', recommendationController.getAllRecommendations);
router.post(
  '/',
  [
    check('title').notEmpty().withMessage('Title is required'),
    check('recommendedBy').notEmpty().withMessage('Recommended by is required'),
  ],
  recommendationController.createRecommendation
);
router.get('/:id', recommendationController.getRecommendationById);
router.put(
  '/:id',
  [
    check('title').optional().notEmpty().withMessage('Title cannot be empty'),
    check('recommendedBy').optional().notEmpty().withMessage('Recommended by cannot be empty'),
  ],
  recommendationController.updateRecommendation
);
router.delete('/:id', recommendationController.deleteRecommendation);

module.exports = router;