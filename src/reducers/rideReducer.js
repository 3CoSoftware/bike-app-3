import { SELECT_RIDE, GET_RIDEDATA, SET_RIDEINDEX, SET_GRAPH_TYPE } from "../actions/types";

const initialState = {
    selectedRide: null, 
    rideData: [],
    rideIndex: 0,
    graphType: "speed"
}

// ride - the selected ride from summary Table (onclick)
// rideData - array of objects, all Garmin ride activity data

const rideReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_RIDE:
            return {
                ...state,
                selectedRide: action.payload
            }
        case GET_RIDEDATA: 
            return {
                ...state, 
                rideData: action.payload 
            }
        case SET_RIDEINDEX: 
            return {
                ...state, 
                rideIndex: action.payload 
            }
        case SET_GRAPH_TYPE: 
            return {
                ...state, 
                graphType: action.payload 
            }
        default:
            return state;
    }
}

export default rideReducer