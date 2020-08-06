const express = require('express');
const usersModel = require('../models/users');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200);
    res.render('signup', {title: 'signup'});
})

router.post('/', (req, res, next) => {
    usersModel
    .add(req.body)
    .then((user) => {
        res.status(200);
        res.end();
    }, e => next({message: e._message, status: 409}))
    .catch((e) => {
        //log error... log(e)
        next({message: "Sorry, we have troubles on our server :(", status: 500});
    })
})

module.exports = router;