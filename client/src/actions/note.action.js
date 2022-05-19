import axios from "axios";

export const GET_NOTES = "GET_NOTES";
export const NEW_NOTE = "NEW_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";

export const getNotes = (Uid) => {
    return(dispatch) => {
        return axios({
            method: 'get',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/note/`
        }).then((res) => {
            return dispatch({type: GET_NOTES, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}

export const newNote = () => {
    return(dispatch) => {
        return axios({
            method: 'post',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/note//new`,
        }).then((res) => {
            return dispatch({type: NEW_NOTE, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}

export const editTitle = (noteId, title) => {
    return(dispatch) => {
        return axios({
            method: 'patch',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/note/${noteId}/title`,
            data: {title}
        }).then((res) => {
            return dispatch({type: EDIT_NOTE, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}

export const changeBanner = (noteId, data) => {
    return(dispatch) => {
        return axios({
            method: 'patch',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/note/${noteId}/banner`,
            data: data
        }).then((res) => {
            return dispatch({type: EDIT_NOTE, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}