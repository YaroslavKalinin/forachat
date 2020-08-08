import * as Actions from '../ActionTypes';

export default function signup(state = {
    error: '',
    isLoading: false,
    isAdded: false
} , action) {
    switch(action.type){
        case Actions.SignupStart:
            return { ...state, isLoading: true, isAdded: false, error: ''}
        case Actions.SignupEnd:
            return { ...state, isLoading: false, isAdded: true, error : ''};
        case Actions.SignupFailed:
            return { ...state, isLoading: false, isAdded: false, error : action.message};
        default:
            return state;
    }
}