import axios from 'axios';
import history from '../history'
import { ADD_NOTE, GET_NOTE } from './types'


export const addNote = item => dispatch => {
    axios.patch('/riders/paul/ridenotes', item)
    .then(res => dispatch({
        type: ADD_NOTE, 
        payload: res.data 
    }))
    history.push('/success')
}

export const getNote = (rideName) => dispatch => {
    axios.get(`/riders/paul/ridenotes/${rideName}`)
    .then(res => dispatch({
        type: GET_NOTE,
        payload: res.data 
    }))
    history.push('/ride')
}
