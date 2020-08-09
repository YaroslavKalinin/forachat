import { put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import * as Actions from '../ActionTypes';

import { authUser, authLogout } from './auth';
import { signup } from './signup';
import { userLoad, participantsLoad, participantJoined, participantLeft } from './socket';

const delay = (ms) => new Promise(res => setInterval(res, ms));

function* watchAuthSaga() {
    yield takeEvery(Actions.AuthUser, authUser);
    yield takeEvery(Actions.AuthLogoutStart, authLogout);
    yield takeEvery(Actions.Signup, signup);
}

function* watchSocketSaga() {
    yield takeLatest(Actions.UserLoad, userLoad);
    yield takeLatest(Actions.ParticipantsLoad, participantsLoad);
    yield takeEvery(Actions.ParticipantJoined, participantJoined);
    yield takeEvery(Actions.ParticipantLeft, participantLeft);
}

export default function* rootSaga() {
    yield all([
        watchAuthSaga(),
        watchSocketSaga()
    ]);
}



