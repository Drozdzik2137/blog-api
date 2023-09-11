const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login
router.post('/login', authController.userLogin);

// Logout
router.post('/logout', authController.userLogout);

// Refresh token
router.get('/refresh', authController.checkRefreshToken)

module.exports = router;