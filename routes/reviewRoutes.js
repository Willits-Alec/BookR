// reviewRoutes.js
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReviews);
router.post(
  '/',
  [
    check('bookId').notEmpty().withMessage('Book ID is required'),
    check('reviewer').notEmpty().withMessage('Reviewer is required'),
    check('content').notEmpty().withMessage('Content is required'),
  ],
  reviewController.createReview
);

router.get('/:id', reviewController.getReviewById);
router.put(
  '/:id',
  [
    check('bookId').optional().notEmpty().withMessage('Book ID cannot be empty'),
    check('reviewer').optional().notEmpty().withMessage('Reviewer cannot be empty'),
    check('content').optional().notEmpty().withMessage('Content cannot be empty'),
  ],
  reviewController.updateReview
);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
