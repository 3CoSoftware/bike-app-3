import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Note from './Note';
import CreateNote from './CreateNote'
import { WrappedMap } from './Map'
import './Ride.css'

class Ride extends Component {

    render() {
        const { note } = this.props 
        const ride = this.props.summary.ride
        return (
            <div className="container">
                <h3>Ride {ride.rideName}</h3>
                <div className="card">
                    { note ? 
                    <Note /> : 
                    <div className="card-body"><p className="card-text">No note for this ride</p><CreateNote /></div>}
                </div>
                
                <WrappedMap 
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAJDxdV_uSLcEHfaZrIn-G4jyZKmO9NZYo"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />

                <Link to="/"><button type="button" className="btn btn-primary my-btn">Go Back</button></Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    summary: state.summary, 
    note: state.note.note[0],

})

export default connect(mapStateToProps, {})(Ride)
