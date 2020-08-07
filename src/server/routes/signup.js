const express = require('express');
const userModel = require('../models/user');
const router = express.Router();


router.post('/', (req, res, next) => {
    userModel
    .create(req.body)
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