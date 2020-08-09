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

/* signup */
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

/* socket */
export function socketConnect(){
    return {
        type: Actions.SocketConnect,
    }
}

export function socketStart(){
    return {
        type: Actions.SocketStart
    }
}

export function socketEnd(){
    return {
        type: Actions.SocketEnd
    }
}

export function socketFailed(err){
    return {
        type: Actions.SocketFailed,
        message: err
    }
}

/* user info */
export function userLoad(){
    return {
        type: Actions.UserLoad
    }
}
export function userLoadStart(){
    return {
        type: Actions.UserLoadStart
    }
}
export function userLoadEnd(id, name){
    return {
        type: Actions.UserLoadEnd,
        id: id,
        name: name
    }
}
export function userLoadFailed(message){
    return {
        type: Actions.UserLoadFailed,
        error: message 
    }
}

/* participants */
export function participantsLoad(roomId){
    return {
        type: Actions.ParticipantsLoad,
        id: roomId
    }
}
export function participantsLoadStart(){
    return {
        type: Actions.ParticipantsLoadStart
    }
}

export function participantsLoadEnd(participants){
    return {
        type: Actions.ParticipantsLoadEnd,
        participants: participants
    }
}

export function participantJoined(participant){
    return {
        type: Actions.ParticipantJoined,
        participant: participant
    }
}

export function participantLeft(id){
    return {
        type: Actions.ParticipantLeft,
        id: id
    }
}

export function participantAdd(participant){
    return {
        type: Actions.ParticipantAdd,
        participant: participant
    }
}

export function participantRemove(id){
    return {
        type: Actions.ParticipantRemove,
        id: id
    }
}