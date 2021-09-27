import axios from 'axios';
import { SELECT_RIDE, GET_RIDEDATA, SET_RIDEINDEX, SET_GRAPH_TYPE } from "./types";

//'http://localhost:8080/bike'

const API_ADDRESS = document.location.origin.includes(':') ? 
    document.location.origin.replace('3000','8080').concat('/bike') : 
    document.location.origin.concat("/bike");

// Stores the selected ride
// Runs when a ride is selected in the summary table 
export const selectRide = ride => {
    return {
        type: SELECT_RIDE,
        payload: ride 
    }
}

// Gets all Garmin activity information for ride
// Runs when map mounts 
export const getRideData = rideName => (dispatch, getState) => {
    const rider = getState().auth.rider;
    let coords = []
    console.log("getRideData for rider:", rider, "rideName:", rideName);
    axios.get(`${API_ADDRESS}/ride/${rider.username}/${rideName}`)
    .then(res => {
        res.data.forEach(entry => { 
            coords.push({lat: entry.latitude, lng: entry.longitude})
        });
        console.log("getRideData dispatching number:", coords.length)
        dispatch({
            type: GET_RIDEDATA,
            payload: res.data 
        });
    });
    
}

export const clearMapOverlay = () => dispatch => {
    //dispatch empty coords so that map initially has no route
    let activities = []
    dispatch({
        type: GET_RIDEDATA,
        payload: activities 
    });
}

// Stores current index of last clicked point in Graph line
export const setRideIndex = index => {
    return {
        type: SET_RIDEINDEX,
        payload: index 
    }
}

export const setGraphType = type => {
    return {
        type: SET_GRAPH_TYPE,
        payload: type
    }
}