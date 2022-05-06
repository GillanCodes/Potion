import { combineReducers } from "redux";

import userReducer from "./user.reducer";
import noteReducer from "./note.reducer";

export default combineReducers({
    userReducer,
    noteReducer
})