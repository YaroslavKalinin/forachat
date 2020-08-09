import { put } from 'redux-saga/effects';
import * as ActionCreators from '../ActionCreators';
import socket from '../../socket/setupSocket';
import url from '../../shared/url';

/* user workers */
export function* userLoad() {
    yield put(ActionCreators.userLoadStart());
    socket.emit('gimme.user');
}

/* participants  worker */
export function* participantsLoad(action) {
    yield put(ActionCreators.participantsLoadStart());
    socket.emit('gimme.participants', (action.id));
}

export function* participantJoined(action) {
    yield put(ActionCreators.participantAdd(action.participant));
}

export function* participantLeft(action) {
    yield put(ActionCreators.participantRemove(action.id));
}

/*messages workers*/
export function* sendMessage(action) {
    socket.emit('send.message', action.message);
}