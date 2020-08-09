import * as Actions from '../ActionTypes';

export default function messages(state = {
    messages: [],
} , action) {
    switch(action.type){
        case Actions.AddMessage:
            console.log('add message');
            return state;
        default:
            return state;
    }
}