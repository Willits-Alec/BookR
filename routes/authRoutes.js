const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.getAllUsers);
router.post('/', authController.createUser);
router.get('/:id', authController.getUserById);
router.put('/:id', authController.updateUser);
router.delete('/:id', authController.deleteUser);

module.exports = router;
