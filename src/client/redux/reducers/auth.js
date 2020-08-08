import * as Actions from '../ActionTypes';

export default function auth(state = {
    isLoggedIn: true,
    error: '',
    isLoading: false
} , action) {
    switch(action.type){
        case Actions.AuthStart:
            return { ...state, isLoading: true, isLoggedIn: false, error: ''}
        case Actions.AuthSuccess:
            return { ...state, isLoading: false, isLoggedIn : true, error : ''};
        case Actions.AuthFailed:
            return { ...state, isLoading: false, isLoggedIn : false, error : action.message};
        case Actions.AuthLogoutEnd:
            return { ...state, isLoading: false, isLoggedIn : false , error : ''};
        
        default:
            return state;
    }
}