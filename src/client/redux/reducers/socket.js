import * as Actions from '../ActionTypes';

export default function socket(state = {
    isConnecting: false,
    error: ''
} , action) {
    switch(action.type){
        case Actions.SocketStart:
            return { ...state, isConnecting: true, error: ''}
        case Actions.SocketEnd:
            return { ...state, isConnecting: false, error : ''};
        case Actions.SocketFailed:
            return { ...state, isConnecting: false, error : action.message};
        default:
            return state;
    }
}