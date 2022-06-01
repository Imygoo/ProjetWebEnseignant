var express = require('express');
var router = express.Router();
const Subscription = require('../models/subscription');
const Education = require('../models/education');
const Teacher = require('../models/teacher');

// get all subscriptions
router.get('/', (req, res) => {
    Subscription.find()
        .then(subscriptions => res.json(subscriptions))
        .catch(err => res.status(404).json({
            message: 'Inscription non trouvés'
        }));
});

// get by user id
router.get('/user/:id', (req, res) => {
    Subscription.find({
        id_user: req.params.id
    })
        .then(subscriptions => res.json(subscriptions))
        .catch(err => res.status(404).json({
            message: 'Inscription non trouvés'
        }));
});

// post a subscription
router.post('/', (req, res) => {
    const subscription = new Subscription({
        id_user: req.body.id_user,
        id_education: req.body.id_education,
        grCM: req.body.grCM,
        grTD: req.body.grTD,
        grTP: req.body.grTP
    });
    subscription.save();

    // if save is success, update education and decrement values

    Education.findById(subscription.id_education)
        .then(education => {
            if (subscription.grCM) {
                education.grCM -= subscription.grCM;
            }
            if (subscription.grTD) {
                education.grTD -= subscription.grTD;
            }
            if (subscription.grTP) {
                education.grTP -= subscription.grTP;
            }
            education.save();

            res.json({
                message: 'Inscription créée',
            });
        })
        .catch(err => res.status(404).json({
            message: 'Enseignement non trouvé'
        }));
});

// get by id
router.get('/:id', (req, res) => {
    Subscription.findById(req.params.id)
        .then(subscription => res.json(subscription))
        .catch(err => res.status(404).json({
            message: 'Inscription non trouvé'
        }));
});

// get by education id
router.get('/education/:id', (req, res) => {
    Subscription.find({
        id_education: req.params.id
    })
        .then(subscriptions => {res.json(subscriptions)})
        .catch(err => res.status(404).json({
            message: 'Inscription non trouvés'
        }));
});

// patch
router.patch('/:id', (req, res) => {
    Subscription.findById(req.params.id)
        .then(subscription => {
            if (req.body.grCM) {
                subscription.grCM = req.body.grCM;
            }
            if (req.body.grTD) {
                subscription.grTD = req.body.grTD;
            }
            if (req.body.grTP) {
                subscription.grTP = req.body.grTP;
            }
            subscription.save();

            // if save is success, update education and decrement values
            Education.findById(subscription.id_education)
                .then(education => {
                    if (subscription.grCM) {
                        education.grCM -= subscription.grCM;
                    }
                    if (subscription.grTD) {
                        education.grTD -= subscription.grTD;
                    }
                    if (subscription.grTP) {
                        education.grTP -= subscription.grTP;
                    }
                    education.save();

                    res.json({
                        message: 'Inscription créée',
                    });
                })
                .catch(err => res.status(404).json({
                    message: 'Enseignement non trouvé'
                }));
        })
        .catch(err => res.status(404).json({
            message: 'Inscription non trouvée'
        }));
});

// delete 
router.post('/unsubscribe', (req, res) => {
    const id_education = req.body.id_education;
    const id_user = req.body.id_user;



    Subscription.findOne({})
        .where('id_education').equals(id_education)
        .where('id_user').equals(id_user)
        .then(subscription => {
            Education.findById(subscription.id_education)
                .then(education => {
                    if (subscription.grCM) {
                        education.grCM += subscription.grCM;
                    }
                    if (subscription.grTD) {
                        education.grTD += subscription.grTD;
                    }
                    if (subscription.grTP) {
                        education.grTP += subscription.grTP;
                    }
                    education.save();

                    Subscription.findByIdAndRemove(subscription._id)
                        .then(() => res.json({
                            message: 'Inscription supprimé'
                        }))
                        .catch(err => res.status(404).json({
                            message: 'Inscription non supprimé'
                        }));
                })
                .catch(err => res.status(404).json({
                    message: 'Enseignement non trouvé'
                }));
        })
        .catch(err => res.status(404).json({
            message: 'Inscription non trouvé'
        }));
});

module.exports = router;