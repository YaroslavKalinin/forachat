import * as Actions from '../ActionTypes';

export default function auth(state = {
    id: '',
    name: '',
    //room? or to separete reducer
    error: '',
    isLoading: false
} , action) {
    switch(action.type){
        case Actions.UserLoadStart:
            return { ...state, id: '', name: '', isLoading: true, isLoggedIn: false, error: ''}
        case Actions.UserLoadEnd:
            return { ...state, id: '', name: '', isLoading: false, isLoggedIn : true, error : ''};
        case Actions.UserLoadFailed:
            return { ...state, id: '', name: '', isLoading: false, isLoggedIn : false, error : action.message};
        default:
            return state;
    }
}