const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login user
const userLogin = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({message: 'Complete the login and password fields'});
        }else{
            const foundUser = await User.findOne({ email: email }).exec();
            if(!foundUser) {
                // No authorisation, no such user exists
                return res.status(401).json({message: "Please enter correct login and password"});
            }else{
                const match = await bcrypt.compare(password, foundUser.password);
            
                if(match) {
                    if(foundUser.isActive == false){
                        return res.status(409).json({message: "Your account has been deactivated"});
                    }
                    const id = foundUser.id;
                    // Role 1 normal user, role 101 moderator, role 1001 admin
                    const role = foundUser.role;
                    
                    // Tworzenie tokenu
                    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
                    const accessToken = jwt.sign(
                        {
                            "id": id,
                            "role": role       
                        },
                        accessSecret,
                        {expiresIn: '10s'}
                    );
            
                    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
            
                    const refreshToken = jwt.sign(
                        {
                            "id": id
                        },
                        refreshSecret,
                        {expiresIn: '7d'}
                    );
            
                    // Saving a refresh token in the database to the user
                    foundUser.refreshToken = refreshToken;
                    const result = await foundUser.save();
            
                    // Transmission of secure cookies with refresh token for HTTPS
                    // res.cookie('jwt', refreshToken, {httpOnly: true, path: '/',  sameSite: 'None', secure: true, maxAge: 24*60*60*1000});

                    // For testing in Postman - without secure
                    // res.cookie('jwt', refreshToken, {httpOnly: true, path: '/', maxAge: 24*60*60*1000});

                    // Cookie for HTTPS site on same domain (subdomain)
                    res.cookie('jwt', refreshToken, {
                        domain: '.iwhitewolf.it', // Domain
                        secure: true,         // Secure HTTPS connection
                        httpOnly: true,       // Only available via server
                        sameSite: 'strict',    // Restriction of access to the same site
                        path: '/', 
                        maxAge: 24*60*60*1000
                    });
                    res.status(200).json({accessToken});
                }else{
                    return res.status(401).json({message: "Please enter correct login and password"})
                }
            }
        }
    }catch(err){
        console.log('Error when login:', err);
        return res.status(500).json({ error: 'Failed to login' });
    }
    
}

// Logout
const userLogout = async (req, res) => {
    try {
        const cookies = req.cookies;
        if(cookies?.jwt){
            const refreshToken = cookies.jwt;
            // Check if token exist in DB and unset refreshToken from user
            await User.findOneAndUpdate({ refreshToken }, { $unset: { refreshToken: 1 } });
        }
        // Delete cookie
        res.clearCookie('jwt', { httpOnly: true, path: '/' });
        return res.status(200).json({ message: 'Successful logout' });
    } catch(err) {
        console.log('Error when logout:', err);
        return res.status(500).json({ error: 'Failed to logout' });
    }
}

// Refresh JWT by logged user
const checkRefreshToken = async (req, res) => {
    try{
        const cookies = req.cookies;
        if (!cookies?.jwt){
            return res.sendStatus(403);
        }
        const refreshToken = cookies.jwt;
    
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser){
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(403); //Forbidden 
        }
        // Sprawdzenie jwt 
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.id !== decoded.id){
                    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                    return res.sendStatus(403);
                }
                const role = foundUser.role;
                const accessToken = jwt.sign(
                    {
                        "id": decoded.id,
                        "role": role  
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }
                );
                // res.json({ roles, accessToken })
                res.status(200).json({ accessToken })
            }
        );
    }catch(err){
        console.log('Error when refreshing token:', err);
        return res.status(500).json({ error: 'Failed to refresh token' });
    }
    
}

module.exports = {
    userLogin: userLogin,
    userLogout: userLogout,
    checkRefreshToken: checkRefreshToken
}