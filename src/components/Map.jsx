import { useEffect } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Polyline } from "react-google-maps";
import { useSelector, useDispatch } from 'react-redux';
import { getOverlay } from '../actions/summaryActions';

function Map() {
    const rideOverlay = useSelector(state => state.summary.rideOverlay);
    const ride = useSelector(state => state.summary.ride);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOverlay(ride.rideName))
    }, [dispatch, ride.rideName])
    
    return (
        <GoogleMap 
            defaultZoom={12}
            defaultCenter={{ lat: 45.5166991, lng: -122.6435973}}
        >

        <Polyline
        path={rideOverlay}
        geodesic={true}
        options={{
            geodesic: true, 
            strokeColor: "#ff2527",
            strokeOpacity: 0.75,
            strokeWeight: 2
        }}
        />

        </GoogleMap>
    )
}

export const WrappedMap = withScriptjs(withGoogleMap(Map))