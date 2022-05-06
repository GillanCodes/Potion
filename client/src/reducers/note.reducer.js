import { GET_NOTES } from '../actions/note.action';

const initialState = {};

export default function userReducer(state = initialState, action) {

    switch(action.type) {
        case GET_NOTES:
            return action.payload;
        default:
            return state;
    }

}