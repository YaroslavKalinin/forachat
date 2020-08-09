import { put } from 'redux-saga/effects';
import * as ActionCreators from '../ActionCreators';
import socket from '../../socket/setupSocket';
import url from '../../shared/url';


export function* userLoad() {
    yield put(ActionCreators.userLoadStart());
    socket.emit('gimme.user');
}

export function* participantsLoad(action) {
    yield put(ActionCreators.participantsLoadStart());
    socket.emit('gimme.participants', (action.id));
}

export function* participantJoined(action) {
    yield put(ActionCreators.participantAdd(action.participant));
    //put join message here
    //yield put(ActionCreators.participantsLoadStart());
}

export function* participantLeft(action) {
    //yield put(ActionCreators.participantAdd(action.participant));
    yield put(ActionCreators.participantRemove(action.id));
    //put join message here
    //yield put(ActionCreators.participantsLoadStart());
}