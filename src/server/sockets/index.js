const io = require('socket.io')();
const jsonwebtoken = require('jsonwebtoken');
const secret = require('../shared/secret');
const userModel = require('../models/user');


io.use(async (socket, next) => {
    try {
        //auth token after each connection
        let token = socket.handshake.headers.cookie.match(/token=([A-Za-z0-9\-\._~\+\/]+)/);
        if(!token){
            throw {message: 'auth failed'};
        }
        token = token[1];
        const user_id = jsonwebtoken.verify(token, secret).id;
        //check if user not already connected
        var sockets = io.sockets.connected;
        for(var socketId in sockets)
        {
            let socket = sockets[socketId]; //loop through and do whatever with each connected socket
            if(user_id.toString() === socket.user_id.toString()) {
                throw {message: 'already connected'};
            }        
        }
        //ensure that user exists in your db
        await userModel
        .findById(user_id)
        .then((user) => {
            if(user){
                //make some info bearers
                socket.user_id = user._id.toString();
                socket.username = user.username;
                socket.roomId = user._id.toString();
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
    //load user event
    socket.on('gimme.user', () => {
       socket.emit('take.user', { id: socket.user_id, name: socket.username });
    });
    //join room event
    socket.on('gimme.participants', (roomId) => {
        socket.join(roomId);
        socket.roomId = roomId;
        //find room
        var room = io.sockets.adapter.rooms[roomId];
        if(room){
            //iterate over all sockets and fetch participants info
            const participants = Object.keys(room.sockets)
            .map(socketId => {
                const socket = io.sockets.connected[socketId];
                return {id: socket.user_id, username: socket.username}
            });
            //get list of participants
            socket.emit('take.participants', participants);
            //notify that socket has joined
            socket.to(socket.roomId).emit('participant.join', ({id: socket.user_id, username: socket.username}));
        }
    });
    socket.on('disconnect', () => {
        //notify that socces has disconnected
        io.to(socket.roomId).emit('participant.leave', socket.user_id);
    })
});

module.exports = io;