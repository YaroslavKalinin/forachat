import { put } from 'redux-saga/effects';
import * as ActionCreators from '../ActionCreators';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function* authUser(action) {
    try {
        //start authorization
        yield put(ActionCreators.authStart());
        //get jwt token as httponly cookie
        const res = yield fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: 'include',
            body: 
                JSON.stringify({
                    username: action.user,
                    password: action.password
                })
        });
        if(res.status === 200){
            yield delay(5000);
            console.log('from auth');
            yield put(ActionCreators.authSuccess());
        }
        else {
            const body = yield res.json();
            yield put(ActionCreators.authFailed(body.message));
        }
    }
    catch(e) {
       yield put(ActionCreators.authFailed(e.message));
    }
}

export function* authLogout() {
    yield put(ActionCreators.authLogoutEnd());
    //clear token
    yield fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include',
    });
}

