import * as Actions from '../ActionTypes';

export default function user(state = {
    user: '',
    error: '',
    isLoading: false
} , action) {
    switch(action.type){
        case Actions.AuthStart:
            return { ...state, isLoading: true, error: ''}
        case Actions.AuthSuccess:
            return { ...state, isLoading: false, user : action.user, error : ''};
        case Actions.AuthFailed:
            return { ...state, isLoading: false, error : action.message};
        case Actions.AuthLogoutEnd:
            return { ...state, isLoading: false, user : '', error : ''};
        default:
            return state;
    }
}