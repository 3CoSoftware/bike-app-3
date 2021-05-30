import React from 'react';
import { useEffect } from "react";
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { getOverlay } from '../actions/summaryActions';

const containerStyle = {
    width: '100%',
    height: '400px'
  };

const center= {
    lat: 45.5166991, 
    lng: -122.6435973
}

const onLoad = polyline => {
    console.log('polyline: ', polyline)
  };

function Map() {
    const rideOverlay = useSelector(state => state.summary.rideOverlay);
    const ride = useSelector(state => state.summary.ride);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOverlay(ride.rideName))
    }, [dispatch, ride.rideName])
    
    return (
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}
        >
            <GoogleMap 
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
            >

            <Polyline
            onLoad={onLoad}
            path={rideOverlay}
            options={{
                strokeColor: "#ff2527",
                strokeOpacity: 0.75,
                strokeWeight: 2,
                visible: true 
            }}
            />

            </GoogleMap>
        </LoadScript>
    )
}

export default Map 