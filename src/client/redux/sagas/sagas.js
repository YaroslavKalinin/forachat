import { put, takeEvery, all } from 'redux-saga/effects';
import * as Actions from '../ActionTypes';

import { authUser, authLogout } from './auth';
import { signup } from './signup';

const delay = (ms) => new Promise(res => setInterval(res, ms));

function* watchAuthSaga() {
    yield takeEvery(Actions.AuthUser, authUser);
    yield takeEvery(Actions.AuthLogoutStart, authLogout);
    yield takeEvery(Actions.Signup, signup);
}



export default function* rootSaga() {
    yield all([
        watchAuthSaga()
    ]);
}



