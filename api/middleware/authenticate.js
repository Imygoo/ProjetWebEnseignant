const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    var token = req.headers['authorization'];
    
    token = token.split(' ')[1];

    if (!token) {
        res.json({
            success: false,
            message: 'Problème de token.'
        });
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Token invalide : ' + err
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
}

module.exports = authenticateToken;