import { put, takeEvery, all } from 'redux-saga/effects';
import * as Actions from '../ActionTypes';
import * as ActionCreators from '../ActionCreators';

import { authUser, authLogout } from './auth';

const delay = (ms) => new Promise(res => setInterval(res, ms));

function* watchAuthSaga() {
    yield takeEvery(Actions.AuthUser, authUser);
    yield takeEvery(Actions.AuthLogoutStart, authLogout);
}



export default function* rootSaga() {
    yield all([
        watchAuthSaga()
    ]);
}



