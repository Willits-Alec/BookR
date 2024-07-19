// bookRoutes.js
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);

router.post(
  '/',
  [
    check('title').notEmpty().withMessage('Title is required'),
    check('author').notEmpty().withMessage('Author is required'),
  ],
  bookController.createBook
);
router.get('/:id', bookController.getBookById);
router.put(
  '/:id',
  [
    check('title').optional().notEmpty().withMessage('Title cannot be empty'),
    check('author').optional().notEmpty().withMessage('Author cannot be empty'),
  ],
  bookController.updateBook
);
router.delete('/:id', bookController.deleteBook);

module.exports = router;