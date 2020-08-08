import * as Actions from '../ActionTypes';

export default function auth(state = {
    id: '',
    name: '',
    error: '',
    isLoading: false
} , action) {
    switch(action.type){
        case Actions.UserLoadStart:
            return { ...state, id: '', name: '', isLoading: true, error: ''}
        case Actions.UserLoadEnd:
            return { ...state, id: action.id, name: action.name, isLoading: false, error : ''};
        case Actions.UserLoadFailed:
            return { ...state, id: '', name: '', isLoading: false, error : action.message};
        default:
            return state;
    }
}