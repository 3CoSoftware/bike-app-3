import { ADD_NOTE, GET_NOTE } from '../actions/types'

const initialState= {
    note: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTE:
            return {
                ...state,
                note: action.payload
            }
        case GET_NOTE:
            return {
                ...state,
                note: action.payload 
            }
        default:
            return state;
    }



}