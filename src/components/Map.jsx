import { useEffect } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Polyline, Marker, Size } from "react-google-maps";
import { useSelector, useDispatch } from 'react-redux';
import { getRideData } from '../actions/rideActions';

//import markerIcon from '../assets/map-marker.jpg';
//import './Marker.css'


const MyMarker = (props) => {
    const { color, name, id } = props;
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

function Map(props) {
    console.log("Map render props", props.google);
    const rideData = useSelector(state => state.ride.rideData);
    const selectedRide = useSelector(state => state.ride.selectedRide);
    const currentRideIndex = useSelector(state => state.ride.rideIndex);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRideData(selectedRide.rideName))
    }, [dispatch, selectedRide.rideName])

    let mapOverlay = [];
    let markerPos = null;
    let mapCenter = { lat: 45.5166991, lng: -122.6435973};
    if(rideData && rideData.length > 0) {
        console.log("Render Map with overlay number items:", rideData.length);
        let latTotal = 0;
        let longTotal = 0;
        rideData.forEach(entry => { 
            mapOverlay.push({lat: entry.latitude, lng: entry.longitude});
            latTotal += entry.latitude;
            longTotal += entry.longitude;
        });
        markerPos = {lat: mapOverlay[currentRideIndex].lat, lng: mapOverlay[currentRideIndex].lng};
        mapCenter = {lat: latTotal/rideData.length, lng: longTotal/rideData.length};
    }
    else {
        console.log("Map but no Overlay");
    }

    //defaultCenter={{ lat: 45.5166991, lng: -122.6435973}}

    return (
        <GoogleMap 
            google={props.google}
            defaultZoom={12}
            center={mapCenter}
        >

            <Polyline
                path={mapOverlay}
                geodesic={true}
                options={{
                    geodesic: true, 
                    strokeColor: "#ff2527",
                    strokeOpacity: 0.75,
                    strokeWeight: 2
                }}
            />

            <Marker className="marker"
                
                position={markerPos}
                //icon={{
                    //scaledSize:  props.google.maps.Size(15,25),
                    //url: markerIcon
                  //}}

            />

        </GoogleMap>
    )
}

export const WrappedMap = withScriptjs(withGoogleMap(Map));