
var express = require('express');
var router = express.Router();
var Teacher = require('../models/teacher');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

// login
router.post('/login', function (req, res) {
    Teacher.findOne({
        email: req.body.email
    }, function (err, teacher) {
        if (err) {
            res.json({
                success: false,
                message: 'Erreur : ' + err
            });
        } else {
            if (teacher) {
                if (teacher.password == req.body.password) {
                    var token = jwt.sign({teacher}, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '24h'
                    });
                    res.json({
                        success: true,
                        message: 'Connexion réussi !',
                        token: token
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Mot de passe incorrect !'
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'Email non connue.'
                });
            }
        }
    });
});

// get user from token
router.get('/me', function (req, res) {
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
                res.json({
                    success: true,
                    teacher: decoded
                });
            }
        });
    }
});

module.exports = router;