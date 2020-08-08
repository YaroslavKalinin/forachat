var io = require('socket.io')();
const jsonwebtoken = require('jsonwebtoken');
const secret = require('../shared/secret');
const userModel = require('../models/user');


//auth token after each connection
io.use(async (socket, next) => {
    console.log()
    try {
        let token = socket.handshake.headers.cookie.match(/token=([A-Za-z0-9\-\._~\+\/]+)/);
        if(!token){
            throw {message: 'auth failed'};
        }
        token = token[1];
        const user_id = jsonwebtoken.verify(token, secret).id;
        await userModel
        .findById(user_id)
        .then((user) => {
            if(user){
                socket.user_id = user_id;
                next();
            }
            else {
                throw {message: 'auth failed'};
            }
        })
    }
    catch(e) {
        next(e);
    }
});


io.on('connection', (socket) => {
    socket.on('gimme.user', () => {
        userModel
        .findById(socket.user_id)
        .then((user) => {
            if(user){
                socket.emit('take.user', { id: user._id, name: user.username });
            }
            else {
                throw {message: 'gimme.user failed'};
            }
        })
       console.log(`Hello ${socket.user_id}`); 
    });
});

module.exports = io;