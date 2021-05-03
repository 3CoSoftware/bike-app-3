import axios from 'axios';
import { GET_RIDE, GET_SUMMARIES } from "./types";

export const getSummaries = () => dispatch => {
    axios.get('http://localhost:8080/bike/summaries')
    .then(res => dispatch({
        type: GET_SUMMARIES,
        payload: res.data 
    }))
}

export const getRide = ride => {
    return {
        type: GET_RIDE,
        payload: ride 
    }
}