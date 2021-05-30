import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editNote } from '../actions/noteActions'
import { Link } from "react-router-dom";

class EditNote extends Component {
    state = {
        notes: this.props.note.notes,
        weather: this.props.note.weather,
        weight: this.props.note.weight,
        restingBP: this.props.note.restingBP,
        heartrate: this.props.note.heartrate,
        sleep: this.props.note.sleep,
        dietYesterday: this.props.note.dietYesterday,
        enthusiasm: this.props.note.enthusiasm,
        rideType: this.props.note.rideType, 
        descriptiveName: this.props.note.descriptiveName
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleClick = (event) => {
        event.preventDefault()

        const rideNote = {
            notes: this.state.notes,
            weather: this.state.weather,
            weight: this.state.weight,
            restingBP: this.state.restingBP,
            heartrate: this.state.heartrate,
            sleep: this.state.sleep,
            dietYesterday: this.state.dietYesterday,
            enthusiasm: this.state.enthusiasm,
            rideType: this.state.rideType, 
            descriptiveName: this.state.descriptiveName
        }

        this.props.editNote(rideNote, this.props.note._id)


    }

    render () {
    return <div className="container">
        <center><h1>Edit Note</h1></center>
        <form id="create-form">
            <div className="form-group">
                <label htmlFor="notes">Add your notes</label>
                <textarea name="notes" id="notes" defaultValue={this.props.note.notes} onChange={this.handleChange} className="form-control" placeholder="Notes" rows="3"/>
            </div>
            <div className="form-group">
                <label htmlFor="weather">Weather</label>
                <input name="weather" id="weather" defaultValue={this.props.note.weather} onChange={this.handleChange} type="text" className="form-control" placeholder="Weather"/>   
            </div>
            <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input name="weight" id="weight" defaultValue={this.props.note.weight} onChange={this.handleChange} type="text" className="form-control" placeholder="Weight"/>
            </div>
            <div className="form-group">
                <label htmlFor="restingBP">Blood Pressure</label>
                <input name="restingBP" id="restingBP" defaultValue={this.props.note.restingBP} onChange={this.handleChange} type="text" className="form-control" placeholder="Resting BP"/>
            </div>
            <div className="form-group">
                <label htmlFor="heartrate">Resting Heart Rate</label>
                <input name="heartrate" id="heartrate" defaultValue={this.props.note.heartrate} onChange={this.handleChange} type="text" className="form-control" placeholder="Heart Rate"/>
            </div>
            <div className="form-group">
                <label htmlFor="sleep">Sleep</label>
                <input name="sleep" id="sleep" defaultValue={this.props.note.sleep} onChange={this.handleChange} type="text" className="form-control" placeholder="Sleep"/>
            </div>
            <div className="form-group">
                <label htmlFor="dietYesterday">Diet Yesterday</label>
                <input name="dietYesterday" id="dietYesterday" defaultValue={this.props.note.dietYesterday} onChange={this.handleChange} type="text" className="form-control" placeholder="Diet Yesterday"/>
            </div>
            <div className="form-group">
                <label htmlFor="enthusiasm">Level of enthusiasm</label>
                <select name="enthusiasm" id="enthusiasm" value={this.props.note.enthusiasm} onChange={this.handleChange} type="text" className="form-control">
                    <option value="" disabled hidden>Choose level of enthusiasm:</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="rideType">Choose ride type</label>
                <select name="rideType" id="rideType" value={this.props.note.rideType} onChange={this.handleChange} type="text" className="form-control">
                    <option value="" disabled hidden>Choose a ride type:</option>
                    <option value="Flat">Flat</option>
                    <option value="Hilly">Hilly</option>
                    <option value="Big climb">Big Climb</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="descriptiveName">Add a descriptive name for ride</label>
                <input name="descriptiveName" id="descriptiveName" defaultValue={this.props.note.descriptiveName} onChange={this.handleChange} type="text" className="form-control" placeholder="Descriptive Name"/>
            </div>
            <button onClick={this.handleClick} type="submit" className="btn btn-success">Submit</button>
            {' '}
            <Link to='/ride'><button className="btn btn-secondary">Go Back</button></Link>
        </form>
    </div>
    }
}

const mapStateToProps = (state) => ({
    note: state.note.note
})

export default connect(mapStateToProps, { editNote })(EditNote)