import axios from 'axios';
import history from '../history'
import { GET_NOTE } from './types'

// Creates a new ridenote 
// Runs when CreateNote form is submitted 
export const addNote = note => (dispatch, getState) => {
    const rider = getState().auth.rider
    axios.patch(`/riders/${rider.username}/ridenotes`, note)
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
    console.log(rider)
    axios.get(`/riders/${rider.username}/ridenotes/${rideName}`)
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
    axios.patch(`/riders/${rider.username}/ridenotes/${id}`, note)
    .then(res => dispatch({
        type: GET_NOTE,
        payload: res.data
    }))
    history.push('/success')
}
