import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import './Note.css'

export default function Note() {
    const note = useSelector(state => state.note.note)

    if (!note) {
        return null 
    }

    return (
        <div className="card-body">
            {note.notes !== "" ? <h5 className="card-title"><u>Ride Notes:</u> {note.notes}</h5> : null}
            {note.weather !== "" ? <p className="card-text"><u>Weather:</u> {note.weather}</p> : null }
            {note.weight !== "" ? <p className="card-text"><u>Weight:</u> {note.weight}</p> : null }
            {note.restingBP !== "" ? <p className="card-text"><u>Resting BP:</u> {note.restingBP}</p> : null }
            {note.heartrate !== "" ? <p className="card-text"><u>Heart Rate:</u> {note.heartrate}</p>    : null }
            {note.sleep !== "" ? <p className="card-text"><u>Sleep:</u> {note.sleep}</p> : null }
            {note.dietYesterday !== "" ? <p className="card-text"><u>Diet Yesterday:</u> {note.dietYesterday}</p> : null}
            {note.enthusiasm !== "" ? <p className="card-text"><u>Enthusiasm:</u> {note.enthusiasm}</p>  : null }
            {note.rideType !== "" ? <p className="card-text"><u>Ride Type:</u> {note.rideType}</p>  : null }
            {note.descriptiveName !== "" ? <p className="card-text"><u>Descriptive Name:</u> {note.descriptiveName}</p>   : null }
            <Link to='/edit'><button className="btn btn-success">Edit note</button></Link>  
        </div>
    )
}
