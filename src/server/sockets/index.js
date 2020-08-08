const io = require('socket.io')();
const jsonwebtoken = require('jsonwebtoken');
const secret = require('../shared/secret');
const userModel = require('../models/user');


//auth token after each connection
io.use(async (socket, next) => {
    socket.handshake.reload();
    try {
        console.log(socket.handshake.headers.cookie);
        let token = socket.handshake.headers.cookie.match(/token=([A-Za-z0-9\-\._~\+\/]+)/);
        if(!token){
            throw {message: 'auth failed'};
        }
        token = token[1];
        const user_id = jsonwebtoken.verify(token, secret).id;
        //ensure that user exists in your db
        await userModel
        .findById(user_id)
        .then((user) => {
            if(user){
                //make some info bearers
                socket.user_id = user._id;
                socket.username = user.username;
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
    //describe protocol
    socket.on('gimme.user', () => {
       socket.emit('take.user', { id: socket.user_id, name: socket.username });
    });
    socket.on('gimme.participants', (roomId) => {
        console.log(roomId);
    });
});

module.exports = io;