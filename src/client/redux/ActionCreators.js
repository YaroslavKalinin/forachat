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