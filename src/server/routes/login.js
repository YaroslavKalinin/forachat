const express = require('express');
const usersModel = require('../models/users');
const secret = require('../shared/secret.js');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();


router.post('/', (req, res, next) => {

    usersModel
    .checkUser(req.body)
    //gens token if auth success and sets it as a cookieeeee
    .then(() => {
            let token = jsonwebtoken.sign({user: req.body.username}, secret, { algorithm: "HS256"});
            res.status(200);
            res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
            res.end();
    },(e =>  next({message: e.message, status: 401})))
    .catch((e) => {
        //log error... log(e)
        next({message: "Sorry, we have troubles on our server :(", status: 500});
    })
});


module.exports = router;