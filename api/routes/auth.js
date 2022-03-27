
var express = require('express');
var router = express.Router();
var Teacher = require('../models/teacher');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// login
router.post('/login', function (req, res) {
    Teacher.findOne({
        email: req.body.email
    }, function (err, teacher) {
        if (err) {
            res.json({
                success: false,
                message: 'Error: ' + err
            });
        } else {
            if (teacher) {
                if (teacher.password == req.body.password) {
                    var token = jwt.sign(teacher, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '24h'
                    });
                    res.json({
                        success: true,
                        message: 'Successfully Logged In!',
                        token: token
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Incorrect Password'
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'Email not found'
                });
            }
        }
    });
});

// get user from token
router.get('/me', function (req, res) {
    var token = req.headers['authorization'];
    if (!token) {
        res.json({
            success: false,
            message: 'No token provided'
        });
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Token invalid: ' + err
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