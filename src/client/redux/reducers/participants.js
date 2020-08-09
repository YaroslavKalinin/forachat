import * as Actions from '../ActionTypes';

export default function participants(state = {
    participants: [],
    name: '',
    error: '',
    Loading: false
} , action) {
    switch(action.type){
        case Actions.ParticipantsLoadStart:
            return { ...state, Loading: true, error: ''}
        case Actions.ParticipantsLoadEnd:
            return { ...state, participants: action.participants, Loading: false, error : ''};
        case Actions.ParticipantsLoadFailed:
            return { ...state, participants: [], Loading: false, error : action.message};
        case Actions.ParticipantAdd:
            return {...state, participants: [...state.participants, action.participant]};
        case Actions.ParticipantRemove:
            const new_participants = state.participants.filter(participant => {
                return action.id.toString() !== participant.id.toString();
            })
            return {...state, participants: [...new_participants]};
        default:
            return state;
    }
}