var express = require('express');
var router = express.Router();
const Education = require('../models/education');

// GET all educations
router.get('/', (req, res) => {
    Education.find()
        .then(educations => res.json(educations))
        .catch(err => res.status(404).json({
            message: 'Enseignements non trouvés'
        }));
});

// get by id
router.get('/:id', (req, res) => {
    Education.findById(req.params.id)
        .then(education => res.json(education))
        .catch(err => res.status(404).json({
            message: 'Enseignement non trouvé'
        }));
});

// create
router.post('/', (req, res) => {
    const education = new Education({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        status: req.body.status,
        nbUc: req.body.nbUc
    });
    education.save()
        .then(() => res.json({
            message: 'Enseignements créé'
        }))
        .catch(err => res.status(404).json({
            message: 'Enseignement non créé.'
        }));
});

// update
router.put('/:id', (req, res) => {
    Education.findById(req.params.id)
        .then(education => {
            education.firstname = req.body.firstname;
            education.lastname = req.body.lastname;
            education.status = req.body.status;
            education.nbUc = req.body.nbUc;
            education.save()
                .then(() => res.json({
                    message: 'Enseignement mis à jour'
                }))
                .catch(err => res.status(404).json({
                    message: 'Enseignement non mis à jour'
                }));
        })
        .catch(err => res.status(404).json({
            message: 'Enseignement non trouvée'
        }));
});

// delete
router.delete('/:id', (req, res) => {
    Education.findByIdAndDelete(req.params.id)
        .then(() => res.json({
            message: 'Enseignement supprimé'
        }))
        .catch(err => res.status(404).json({
            message: 'Enseignement non supprimé'
        }));
});

module.exports = router;