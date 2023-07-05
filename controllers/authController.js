const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login user
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(401).json({message: 'Uzupełnij pole login i hasło'});
    }else{
        const foundUser = await User.findOne({ email: email }).exec();
        if(!foundUser) {
            // No authorisation, no such user exists
            return res.status(401).json({message: "Podaj poprawne dane logowania"});
        }else{
            const match = await bcrypt.compare(password, foundUser.password);
        
            if(match) {
                if(foundUser.isActive == false){
                    return res.status(409).json({message: "Twoje konto zostało dezaktywowane"});
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
                    {expiresIn: '1d'}
                );
        
                // Saving a refresh token in the database to the user
                foundUser.refreshToken = refreshToken;
                const result = await foundUser.save();
        
                // Transmission of secure cookies with refresh token
                // res.cookie('jwt', refreshToken, {httpOnly: true,  sameSite: 'None', secure: true, maxAge: 24*60*60*1000});
                // For testing in Postman - without secure
                res.cookie('jwt', refreshToken, {httpOnly: true,  sameSite: 'None', maxAge: 24*60*60*1000});
                res.status(200).json({accessToken});
            }else{
                return res.status(401).json({message: "Podaj poprawne dane logowania"})
            }
        }
    }
}

// Refresh JWT by logged user
const checkRefreshToken = async (req, res) => {
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
            const role = Object.values(foundUser.role);
            const accessToken = jwt.sign(
                {
                    "id": decoded.id,
                    "roles": role
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            // res.json({ roles, accessToken })
            res.json({ accessToken })
        }
    );
}

module.exports = {
    userLogin: userLogin,
    checkRefreshToken: checkRefreshToken
}