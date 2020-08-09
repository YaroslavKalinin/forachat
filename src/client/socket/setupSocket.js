//yp, looks ugly
import io from 'socket.io-client';
import url from '../shared/url';
import store from '../redux/configureStore';
import * as ActionCreators from '../redux/ActionCreators';

let socket = io.connect(url);

//data flow
// - connect
// - take.user
// - take.participants

socket.on('connect', () => {
    console.log('success');
})

socket.on('error', (message) => {
    store.dispatch(ActionCreators.socketFailed(message));
    //logout every time you lost connection
    store.dispatch(ActionCreators.authFailed(message));
    console.log(message);
})

//user listeners
socket.on('take.user', (user) => {
    store.dispatch(ActionCreators.userLoadEnd(user.id, user.name));
    //socket.emit('gimme.participant', )
})

//test listener
socket.on('ping', () => {
    console.log('pong');
})

//participants listeners
socket.on('take.participants', (participants) => {
    store.dispatch(ActionCreators.participantsLoadEnd(participants));
});

socket.on('participant.join', (participant) => {
    store.dispatch(ActionCreators.participantJoined(participant));
});

socket.on('participant.leave', (id) => {
    store.dispatch(ActionCreators.participantLeft(id));
});

//message listeners
socket.on('take.message', (message) => {
    store.dispatch(ActionCreators.addMessage(message));
});

export default socket;
