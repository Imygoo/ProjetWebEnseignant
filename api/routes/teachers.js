var express = require('express');
var router = express.Router();
const Teacher = require('../models/teacher');

// GET all teachers
router.get('/', (req, res) => {
    Teacher.find()
        .then(teachers => res.json(teachers))
        .catch(err => res.status(404).json({
            message: 'Enseignant non trouvé'
        }));
});

// get by id
router.get('/:id', (req, res) => {
    Teacher.findById(req.params.id)
        .then(teacher => res.json(teacher))
        .catch(err => res.status(404).json({
            message: 'Enseignant non trouvé'
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
            message: 'Enseignant créé'
        }))
        .catch(err => res.status(404).json({
            message: 'Enseignant non créé : ' + err
        }));
});

// update
router.put('/:id', (req, res) => {
    Teacher.findById(req.params.id).then(teacher => {

        req.body.firstname != null ? teacher.firstname = req.body.firstname : null;
        req.body.lastname != null ? teacher.lastname = req.body.lastname : null;
        req.body.status != null ? teacher.status = req.body.status : null;
        req.body.maxHours != null ? teacher.maxHours = req.body.maxHours : null;
        req.body.email != null ? teacher.email = req.body.email : null;
        req.body.password != null ? teacher.password = req.body.password : null;

        teacher.save()
            .then(() => res.json({
                message: 'Enseignant mis à jour'
            }))
            .catch(err => res.status(404).json({
                message: 'Enseignant non mis à jour' + err
            }));
    }).catch(err => res.status(404).json({
        message: 'Enseignant non trouvé'
    }));
});

// delete
router.delete('/:id', (req, res) => {
    Teacher.findByIdAndDelete(req.params.id)
        .then(() => res.json({
            message: 'Enseignant supprimé'
        }))
        .catch(err => res.status(404).json({
            message: 'Enseignant non supprimé'
        }));
});


module.exports = router;