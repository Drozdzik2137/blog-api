const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser  = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    // Verify jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Search user in db
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
    throw new Error();
    }

    console.log(user);

    // send user to next function
    req.user = user;
    next();
}

module.exports = {
    authenticateUser: authenticateUser
};