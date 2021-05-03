import { ADD_NOTE, GET_NOTE } from '../actions/types'

const initialState= {
    notes: [ ],
    note: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTE:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
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