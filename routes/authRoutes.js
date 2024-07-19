// authRoutes
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.getAllUsers);
router.post(
  '/',
  [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  authController.createUser
);
router.get('/:id', authController.getUserById);
router.put(
  '/:id',
  [
    check('username').optional().notEmpty().withMessage('Username cannot be empty'),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  authController.updateUser
);
router.delete('/:id', authController.deleteUser);

module.exports = router;
