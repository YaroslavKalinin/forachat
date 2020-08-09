import * as Actions from '../ActionTypes';

export default function messages(state = {
    messages: [],
} , action) {
    switch(action.type){
        case Actions.AddMessage:
            return { ...state, messages: [...state.messages, action.message] };
        default:
            return state;
    }
}