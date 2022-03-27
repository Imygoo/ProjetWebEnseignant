var express = require('express');
var router = express.Router();
const Education = require('../models/education');

// GET all educations
router.get('/', (req, res) => {
    Education.find()
        .then(educations => res.json(educations))
        .catch(err => res.status(404).json({
            message: 'Educations not found'
        }));
});

// get by id
router.get('/:id', (req, res) => {
    Education.findById(req.params.id)
        .then(education => res.json(education))
        .catch(err => res.status(404).json({
            message: 'Education not found'
        }));
});

// create
router.post('/', (req, res) => {
    const education = new Education({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        status: req.body.status,
        maxHours: req.body.maxHours
    });
    education.save()
        .then(() => res.json({
            message: 'Education created'
        }))
        .catch(err => res.status(404).json({
            message: 'Education not created'
        }));
});

// update
router.put('/:id', (req, res) => {
    Education.findById(req.params.id)
        .then(education => {
            education.firstname = req.body.firstname;
            education.lastname = req.body.lastname;
            education.status = req.body.status;
            education.maxHours = req.body.maxHours;
            education.save()
                .then(() => res.json({
                    message: 'Education updated'
                }))
                .catch(err => res.status(404).json({
                    message: 'Education not updated'
                }));
        })
        .catch(err => res.status(404).json({
            message: 'Education not found'
        }));
});

// delete
router.delete('/:id', (req, res) => {
    Education.findByIdAndDelete(req.params.id)
        .then(() => res.json({
            message: 'Education deleted'
        }))
        .catch(err => res.status(404).json({
            message: 'Education not deleted'
        }));
});

module.exports = router;