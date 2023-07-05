const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser  = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    // // Verify jwt
    // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // // Search user in db
    // const user = await User.findOne({ id: decoded.userId });

    // if (!user) {
    //     return res.sendStatus(401);
    // }
    // // send user to next function
    // req.user = user;
    // next();
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.sendStatus(401);
            const user = await User.findOne({ id: decoded.userId });
            req.user = user;
            next();
        }
    );
}

module.exports = {
    authenticateUser: authenticateUser
};