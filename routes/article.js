const express = require('express');
const router = express.Router();
const secure = require('../middleware/verifyJWT');

module.exports = router;