var express = require('express');
var router = express.Router();
const Status = require('../models/status');

// CRUD status
router.get('/', (req, res) => {
    Status.find({}, (err, status) => {
        if (err) {
            res.send(err);
        }
        res.json(status);
    });
});

// by id 
router.get('/:id', (req, res) => {
    Status.findById(req.params.id, (err, status) => {
        if (err) {
            res.send(err);
        }
        res.json(status);
    });
});

// update
router.put('/:id', (req, res) => {
    Status.findById(req.params.id, (err, status) => {
        if (err) {
            res.send(err);
        }
        status.heureTD = req.body.heureTD;
        status.heureTP = req.body.heureTP;
        status.heureCM = req.body.heureCM;
        status.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Status updated' });
        });
    });
});

module.exports = router;