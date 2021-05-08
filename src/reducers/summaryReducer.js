import { GET_SUMMARIES, GET_RIDE, GET_OVERLAY } from "../actions/types";

const initialState = {
    summaries: [],
    ride: null, 
    rideOverlay: []
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
        case GET_OVERLAY: 
            return {
                ...state, 
                rideOverlay: action.payload 
            }
        default:
            return state;
    }
}