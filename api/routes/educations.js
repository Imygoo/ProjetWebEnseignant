var express = require('express');
var router = express.Router();
const Education = require('../models/education');

// GET all educations
router.get('/', (req, res) => {
    Education.find()
        .then(educations => res.json(educations))
        .catch(err => res.status(404).json({
            message: 'Matières non trouvées.'
        }));
});

// get by id
router.get('/:id', (req, res) => {
    Education.findById(req.params.id)
        .then(education => res.json(education))
        .catch(err => res.status(404).json({
            message: 'Matière non trouvé.'
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
            message: 'Matière créée.'
        }))
        .catch(err => res.status(404).json({
            message: 'Matière non créée.'
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
                    message: 'Matière mise à jour.'
                }))
                .catch(err => res.status(404).json({
                    message: 'Matière non mise à jour.'
                }));
        })
        .catch(err => res.status(404).json({
            message: 'Matière non trouvée.'
        }));
});

// delete
router.delete('/:id', (req, res) => {
    Education.findByIdAndDelete(req.params.id)
        .then(() => res.json({
            message: 'Matière supprimée.'
        }))
        .catch(err => res.status(404).json({
            message: 'Matière non supprimée.'
        }));
});

module.exports = router;