import axios from 'axios';
import history from '../history'
import { GET_NOTE, SET_NOTES_SHOW } from './types'

const API_ADDRESS = document.location.origin.includes(':') ? 
    document.location.origin.replace('3000','5000') : 
    document.location.origin;


// Creates a new ridenote 
// Runs when CreateNote form is submitted 
export const addNote = note => (dispatch, getState) => {
    const rider = getState().auth.rider
    console.log("addNote rider:", rider);
    axios.patch(`${API_ADDRESS}/riders/${rider.username}/ridenotes`, note)
    .then(res => dispatch({
        type: GET_NOTE, 
        payload: res.data 
    })
    )
}

// Gets a ridenote for a particular ride
// Runs when a ride is selected from the summaries table 
export const getNote = rideName => (dispatch, getState) => {
    const rider = getState().auth.rider
    console.log("getNote rider:", rider);
    axios.get(`${API_ADDRESS}/riders/${rider.username}/ridenotes/${rideName}`)
    .then(res => dispatch({
        type: GET_NOTE,
        payload: res.data 
    }))
    history.push('/ride')
}

// Edits a ride note 
// Runs when  edit form is submitted
// Redirects to success confirmation page
export const editNote = (note, id) => (dispatch, getState) => {
    const rider = getState().auth.rider
    console.log("editNote rider:", rider);
    axios.patch(`${API_ADDRESS}/riders/${rider.username}/ridenotes/${id}`, note)
    .then(res => dispatch({
        type: GET_NOTE,
        payload: res.data
    }))
    history.push('/success')
}

export const showNotes = () => {
    return { type: SET_NOTES_SHOW, showNotes: true };
}

export const hideNotes = () => {
    return { type: SET_NOTES_SHOW, showNotes: false };
}
