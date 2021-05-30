import React from 'react'
import { Link } from "react-router-dom";
import Note from './Note';
import CreateNote from './CreateNote'
//import Map from './Map2'
import { WrappedMap } from './Map'
import './Ride.css'
import { useSelector } from 'react-redux';

export default function Ride() {
    const note = useSelector(state => state.note.note)
    const ride = useSelector(state => state.summary.ride)
    
    return (
        <div>
            <div className="container">
                <h3>Ride {ride.rideName}</h3>
                <div className="card">
                    { note ? 
                    <Note />  : 
                    (<div className="card-body">
                        <p className="card-text"><strong>No note for this ride</strong></p>
                        <CreateNote />
                    </div>)
                    }
                    
                </div>
                
          
                <WrappedMap 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />


                <Link to="/"><button type="button" className="btn btn-primary my-btn">Go Back</button></Link>
            </div>
        </div>
    )
}
