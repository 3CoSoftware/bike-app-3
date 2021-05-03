import { GET_SUMMARIES, GET_RIDE } from "../actions/types";

const initialState = {
    summaries: [],
    ride: null 
}

export default function(state= initialState, action) {
    switch (action.type) {
        case GET_SUMMARIES:
            return {
                ...state,
                summaries: action.payload
            }
        case GET_RIDE:
            return {
                ...state,
                ride: action.payload
            }
        default:
            return state;
    }
}