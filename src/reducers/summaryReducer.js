import { GET_SUMMARIES } from "../actions/types";

const initialState = {
    summaries: []
}
// summaries - array of objects, bike rides. Used in Table 

const summaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SUMMARIES:
            return {
                ...state,
                summaries: action.payload
            }
        default:
            return state;
    }
}

export default summaryReducer