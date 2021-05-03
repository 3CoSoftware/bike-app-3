import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Note from './Note';
import CreateNote from './CreateNote'
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

                <Link to="/"><button type="button" className="btn btn-primary my-btn">Go Back</button></Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    summary: state.summary, 
    note: state.note.note[0]
})

export default connect(mapStateToProps, {})(Ride)
