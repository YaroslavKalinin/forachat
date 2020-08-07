const express = require('express');
const userModel = require('../models/user');
const secret = require('../shared/secret.js');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();


router.post('/', (req, res, next) => {
    userModel
    .check(req.body)
    //gens token if auth success and sets it as a cookieeeee
    .then((user_id) => {
            let token = jsonwebtoken.sign({id: user_id}, secret, { algorithm: "HS256"});
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