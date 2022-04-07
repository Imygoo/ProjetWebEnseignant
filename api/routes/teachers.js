var express = require('express');
var router = express.Router();
const Teacher = require('../models/teacher');

// GET all teachers
router.get('/', (req, res) => {
    Teacher.find()
        .then(teachers => res.json(teachers))
        .catch(err => res.status(404).json({
            message: 'Enseignant non trouvé.'
        }));
});

// get by id
router.get('/:id', (req, res) => {
    Teacher.findById(req.params.id)
        .then(teacher => res.json(teacher))
        .catch(err => res.status(404).json({
            message: 'Enseignant non trouvé.'
        }));
});

// create
router.post('/', (req, res) => {
    const teacher = new Teacher({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        status: req.body.status,
        maxHours: req.body.maxHours,
        email: req.body.email,
        password: req.body.password
    });
    teacher.save()
        .then(() => res.json({
            message: 'Enseignant créé.'
        }))
        .catch(err => res.status(404).json({
            message: 'Enseignant non créé : ' + err 
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
            teacher.email = req.body.email;
            teacher.password = req.body.password;
            teacher.save()
                .then(() => res.json({
                    message: 'Enseignant mis à jour.'
                }))
                .catch(err => res.status(404).json({
                    message: 'Enseignant non mis à jour.'
                }));
        })
        .catch(err => res.status(404).json({
            message: 'Enseignant non trouvé.'
        }));
});

// delete
router.delete('/:id', (req, res) => {
    Teacher.findByIdAndDelete(req.params.id)
        .then(() => res.json({
            message: 'Enseignant supprimé.'
        }))
        .catch(err => res.status(404).json({
            message: 'Enseignant non supprimé.'
        }));
});

module.exports = router;