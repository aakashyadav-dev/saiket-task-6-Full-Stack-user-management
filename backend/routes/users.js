// routes/users.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');

// GET /api/v1/users - Get all users
router.get('/', UserController.getAllUsers);

// GET /api/v1/users/:id - Get user by ID
router.get('/:id', UserController.getUserById);

// POST /api/v1/users - Create a new user
router.post('/', validateUser, UserController.createUser);

// PUT /api/v1/users/:id - Update a user
router.put('/:id', validateUser, UserController.updateUser);

// DELETE /api/v1/users/:id - Delete a user
router.delete('/:id', UserController.deleteUser);

module.exports = router;