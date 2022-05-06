import axios from "axios";

export const GET_NOTES = "GET_NOTES";

export const getNotes = (Uid) => {
    return(dispatch) => {
        return axios({
            method: 'get',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/note/`
        }).then((res) => {
            dispatch({type: GET_NOTES, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}