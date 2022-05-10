import { EDIT_NOTE, GET_NOTES } from '../actions/note.action';

const initialState = {};

export default function userReducer(state = initialState, action) {

    switch(action.type) {
        case GET_NOTES:
            return action.payload;
        case EDIT_NOTE:
            return state.map((note) => {
                if (note._id === action.payload._id) {
                    return action.payload
                }
                return note
            })
        default:
            return state;
    }

}