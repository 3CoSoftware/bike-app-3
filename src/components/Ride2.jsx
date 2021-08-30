import React from 'react'
import { Link } from "react-router-dom";
import Note from './Note';
//import Map from './Map2'
import { WrappedMap } from './Map'
import './Ride.css'
import { useSelector, useDispatch } from 'react-redux';
import { setGraphType } from '../actions/rideActions';
import Chart from './Graph'




export default function Ride() {

    const dispatch = useDispatch()
    
    function handleGraphType(e) {
        console.log('handleChange',e.target.name, e.target.value);
        dispatch(setGraphType(e.target.value));
    }

        const note = useSelector(state => state.note.note)
        const ride = useSelector(state => state.summary.ride)
        const displayNote = useSelector(state => state.note.displayNote)
        const graphType = useSelector(state => state.ride.graphType)
    
        return (
            <div>
                <div className="container">
                    <Note />
          
                    <WrappedMap 
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAJDxdV_uSLcEHfaZrIn-G4jyZKmO9NZYo`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                    <label htmlFor="Graph">Graph type:</label>
                    <select name="graph" id="graph" onChange={handleGraphType} defaultValue={graphType} type="text" className="form-control" style={ { display: 'inline-block', width: '300px', margin: 10} }>
                            <option value="" disabled hidden>Choose what to graph:</option>
                            <option value="speed">Speed</option>
                            <option value="heartRate">Heart Rate</option>
                            <option value="altitude">Elevation</option>
                            <option value="enhancedAltitude">Enhanced Elevation</option>
                            <option value="temperature">Temperature</option>
                            <option value="percentGrade">% Grade</option>
                            <option value="averagedGrade">Avg % Grade</option>
                    </select> 

                    <Chart />


                </div>
            </div>
        )
    }
//}

//export default Ride;
