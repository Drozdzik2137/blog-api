const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const secure = require('../middleware/authMiddleware');
const role = require('../middleware/authorizeAdmin');

// Register a new user
router.post('/register', UserController.registerUser);

// Deactivate user account (only accessible by admin)
router.put('/deactivate/:userId', secure.authenticateUser , role.authorizeAdmin, UserController.deactivateUser);

// Change user role (only accessible by admin)
router.put('/change-role/:userId', secure.authenticateUser, role.authorizeAdmin, UserController.changeUserRole);

module.exports = router;