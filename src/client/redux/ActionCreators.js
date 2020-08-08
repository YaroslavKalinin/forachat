import * as Actions from './ActionTypes';

/* auth */
export function authUser(user, password){
    return {
        type: Actions.AuthUser,
        user: user,
        password: password
    }
}

export function authStart(){
    return {
        type: Actions.AuthStart
    }
}

export function authSuccess(user){
    return {
        type: Actions.AuthSuccess,
        user: user
    }
}

export function authFailed(err){
    return {
        type: Actions.AuthFailed,
        message: err
    }
}

export function authLogoutStart(){
    return {
        type: Actions.AuthLogoutStart
    }
}

export function authLogoutEnd(){
    return {
        type: Actions.AuthLogoutEnd
    }
}

export function signup(user, password){
    return {
        type: Actions.Signup,
        username: user,
        password: password
    }
}

export function signupStart(){
    return {
        type: Actions.SignupStart
    }
}

export function signupEnd(){
    return {
        type: Actions.SignupEnd
    }
}

export function signupFailed(err){
    return {
        type: Actions.SignupFailed,
        message: err
    }
}

/* user info */