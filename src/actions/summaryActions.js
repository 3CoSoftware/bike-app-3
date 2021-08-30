import axios from 'axios';
import { GET_SUMMARIES } from "./types";

// Gets all ride summaries 
// Runs when Table component mounts 
// export const getSummaries = () => dispatch => {
//     axios.get('http://localhost:8080/bike/summaries')
//     .then(res => dispatch({
//         type: GET_SUMMARIES,
//         payload: res.data 
//     }))
// }

//const API_ADDRESS = document.location.origin.includes(':') ? 
//    'http://localhost:8080/bike' : document.location.origin;

const API_ADDRESS = document.location.origin.includes(':') ? 
    document.location.origin.replace('3000','8080').concat('/bike') : 
    document.location.origin.concat("/bike");
    

// Gets all ride summaries and converts measurements 
// Runs when Table component mounts 
export const getSummaries = () => (dispatch, getState) => {
    const rider = getState().auth.rider
    console.log("getSummaries for rider:", rider.username);
    let formattedSummaries
    axios.get(`${API_ADDRESS}/summaries/${rider.username}`)
    .then(res => {
        formattedSummaries = res.data 
        formattedSummaries.forEach((entry) => {
            entry["startTime"] = new Date(parseFloat(entry["startTimeLong"]*1000)).toLocaleString()
            entry["stopTime"] = new Date(parseFloat(entry["stopTimeLong"]*1000)).toLocaleString()
            if (rider.units === 'imperial') {
                entry["averageSpeed"] = parseFloat(entry["averageSpeed"] * 2.237).toFixed(2)
                entry["maxSpeed"] = parseFloat(entry["maxSpeed"] * 2.237).toFixed(2)
                entry["distance"] = parseFloat(entry["distance"] / 1609.344).toFixed(2)
            }
            else if (rider.units === 'metric') {
                entry["averageSpeed"] = parseFloat(entry["averageSpeed"] / 1000).toFixed(2)
                entry["maxSpeed"] = parseFloat(entry["maxSpeed"] * 1000).toFixed(2)
                entry["distance"] = parseFloat(entry["distance"] / 1000).toFixed(2)
 
            }
        })
        console.log("getSummaries dispatching", formattedSummaries.length, "summaries");

        dispatch({
            type: GET_SUMMARIES,
            payload: formattedSummaries
        });
    }); 

}


