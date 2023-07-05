const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login
router.post('/login', authController.userLogin);

// Refresh token
router.get('/refresh', authController.checkRefreshToken)

module.exports = router;