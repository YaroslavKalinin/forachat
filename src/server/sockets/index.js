var io = require('socket.io')();
const jsonwebtoken = require('jsonwebtoken');
const secret = require('../shared/secret');
const userModel = require('../models/user');


//auth token after each connection
io.use(async (socket, next) => {
    let token = socket.handshake.headers.cookie.match(/token=([A-Za-z0-9\-\._~\+\/]+)/)[1];
    const user_id = jsonwebtoken.verify(token, secret).user_id;
    await userModel
    .findById(user_id)
    .then((user) => {
        if(user){
            socket.user_id = user_id;
            next();
        }
        else {
            next('Authorization err');
        }
    })
    .catch((e) => {
        //log error... log(e)
        next({message: "Sorry, we have troubles on our server :(", status: 500});
    })
});


io.on('connection', (socket) => {
    socket.on('sig', () => {
       console.log(`Hello ${socket.user}`); 
    });
});

module.exports = io;