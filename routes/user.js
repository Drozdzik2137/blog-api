const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const secure = require('../middleware/authMiddleware');
const role = require('../middleware/authorizeAdmin');

// Register a new user - path initially inactive 
router.post('/register', UserController.registerUser);

// Get all users data (only accessible by admin)
router.get('/all', secure.authenticateUser, role.authorizeAdmin, UserController.getAllUsers);

// Get user data
router.get('/:id', secure.authenticateUser, UserController.getUser);

// Activate user account (only accessible by admin)
router.put('/activate/:userId', secure.authenticateUser, role.authorizeAdmin, UserController.activateUser);

// Deactivate user account (only accessible by admin)
router.put('/deactivate/:userId', secure.authenticateUser, role.authorizeAdmin, UserController.deactivateUser);

// Change user role (only accessible by admin)
router.put('/change-role/:userId', secure.authenticateUser, role.authorizeAdmin, UserController.changeUserRole);

module.exports = router;