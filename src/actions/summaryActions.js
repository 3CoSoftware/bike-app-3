import axios from 'axios';
import { GET_RIDE, GET_SUMMARIES, GET_OVERLAY } from "./types";

// Gets all ride summaries 
// Runs when Table component mounts 
// export const getSummaries = () => dispatch => {
//     axios.get('http://localhost:8080/bike/summaries')
//     .then(res => dispatch({
//         type: GET_SUMMARIES,
//         payload: res.data 
//     }))
// }

// Gets all ride summaries and converts measurements 
// Runs when Table component mounts 
export const getSummaries = () => (dispatch, getState) => {
    const rider = getState().auth.rider
    let formattedSummaries
    axios.get('http://localhost:8080/bike/summaries')
    .then(res => {
        if (rider.units === 'imperial') {
            console.log('We made it')
            formattedSummaries = res.data 
            formattedSummaries.forEach((entry) => {
            entry["averageSpeed"] = parseFloat(entry["averageSpeed"] * 2.237).toFixed(2)
            entry["maxSpeed"] = parseFloat(entry["maxSpeed"] * 2.237).toFixed(2)
            entry["distance"] = parseFloat(entry["distance"] / 1609.344).toFixed(2)
        })
        } else {
            formattedSummaries = res.data
        }
        
        dispatch({
            type: GET_SUMMARIES,
            payload: formattedSummaries

        })
    })
}


// Stores the selected ride
// Runs when a ride is selected in the summary table 
export const getRide = ride => {
    return {
        type: GET_RIDE,
        payload: ride 
    }
}

// Gets information for ride overlay
// Creates array of objects with lat and lng (coords)
// Runs when map mounts 
export const getOverlay = rideName => dispatch => {
    let coords = []
    axios.get(`http://localhost:8080/bike/ride/${rideName}`)
    .then(res => 
        res.data.forEach(entry => { coords.push({lat: entry.latitude, lng: entry.longitude})}),
        dispatch({
            type: GET_OVERLAY,
            payload: coords 
        })
    )
    
}