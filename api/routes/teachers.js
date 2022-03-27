var express = require('express');
var router = express.Router();
const Teacher = require('../models/teacher');

// GET all teachers
router.get('/', (req, res) => {
    Teacher.find()
        .then(teachers => res.json(teachers))
        .catch(err => res.status(404).json({
            message: 'Teachers not found'
        }));
});

// get by id
router.get('/:id', (req, res) => {
    Teacher.findById(req.params.id)
        .then(teacher => res.json(teacher))
        .catch(err => res.status(404).json({
            message: 'Teacher not found'
        }));
});

// create
router.post('/', (req, res) => {
    const teacher = new Teacher({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        status: req.body.status,
        maxHours: req.body.maxHours
    });
    teacher.save()
        .then(() => res.json({
            message: 'Teacher created'
        }))
        .catch(err => res.status(404).json({
            message: 'Teacher not created'
        }));
});

// update
router.put('/:id', (req, res) => {
    Teacher.findById(req.params.id)
        .then(teacher => {
            teacher.firstname = req.body.firstname;
            teacher.lastname = req.body.lastname;
            teacher.status = req.body.status;
            teacher.maxHours = req.body.maxHours;
            teacher.save()
                .then(() => res.json({
                    message: 'Teacher updated'
                }))
                .catch(err => res.status(404).json({
                    message: 'Teacher not updated'
                }));
        })
        .catch(err => res.status(404).json({
            message: 'Teacher not found'
        }));
});

// delete
router.delete('/:id', (req, res) => {
    Teacher.findByIdAndDelete(req.params.id)
        .then(() => res.json({
            message: 'Teacher deleted'
        }))
        .catch(err => res.status(404).json({
            message: 'Teacher not deleted'
        }));
});

module.exports = router;