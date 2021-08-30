import { GET_NOTE, SET_NOTES_SHOW } from '../actions/types'

const initialState= {
    note: null,
    displayNote: true
}
// note - ride note for selected ride. Used in Ride 

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTE:
            return {
                ...state,
                note: action.payload 
            }
        case SET_NOTES_SHOW:
            return {
                ...state,
                displayNote: action.showNotes
            };
        default:
            return state;
    }
}

export default noteReducer