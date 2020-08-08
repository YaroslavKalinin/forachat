import { put } from 'redux-saga/effects';
import * as ActionCreators from '../ActionCreators';

export function* signup(action) {
    try {
        //start signup
        yield put(ActionCreators.signupStart());
        //try to register user
        const res = yield fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: 
                JSON.stringify({
                    username: action.username,
                    password: action.password
                })
        });
        if(res.status === 200){
            yield put(ActionCreators.signupEnd());
        }
        else {
            const body = yield res.json();
            yield put(ActionCreators.signupFailed(body.message));
        }
    }
    catch(e) {
       yield put(ActionCreators.signupFailed(e.message));
    }
}