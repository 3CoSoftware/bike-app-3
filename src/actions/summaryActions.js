import axios from 'axios';
import { GET_RIDE, GET_SUMMARIES, GET_OVERLAY } from "./types";

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

export const getOverlay = rideName => dispatch => {
    let coords = []
    axios.get(`http://localhost:8080/bike/ride/${rideName}`)
    .then(res => 
        res.data.forEach(entry => { coords.push({lat: entry.latitude, lng: entry.longitude})})
    )
    dispatch({
        type: GET_OVERLAY,
        payload: coords 
    })
}