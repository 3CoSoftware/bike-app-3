import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote, showNotes, hideNotes, editNote } from '../actions/noteActions'
import './Note.css'

class Note extends Component {

    state = {
        notes: "",
        weather: "",
        weight: "",
        restingBP: "",
        heartrate: "",
        sleep: "",
        dietYesterday: "",
        enthusiasm: "",
        rideType: "", 
        descriptiveName: ""
    }


    handleChange = (e) => {
        console.log('handleChange',e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    handleCreateNote = ({note}) => () =>{
        console.log('this.handleCreateNote');
        const rideNote = {
            rideName: this.props.selectedRide.rideName,
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

        this.props.addNote(rideNote);
    }

    handleSubmit = (event) => {
        event.preventDefault()

        console.log('handleSubmit state:', this.state)

        const rideNote = {
            rideName: this.props.selectedRide.rideName,
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

        this.props.editNote(rideNote, this.props.note._id);
        
        this.setState({
            notes: "",
            weather: "",
            weight: "",
            restingBP: "",
            heartrate: "",
            sleep: "",
            dietYesterday: "",
            enthusiasm: "",
            rideType: "", 
            descriptiveName: ""
        })
        document.getElementById("create-form").reset()

    }

    render () {
        const { note, displayNote, showNotes, hideNotes } = this.props;

        if (!note) {
            return (
                <button onClick={this.handleCreateNote({note})} type="submit" className="btn-success">Add ride notes...</button>
            )           
        }

        if (!displayNote) {
            return (
                <button onClick={showNotes} type="submit" className="btn-success">Show ride notes...</button>
            )
        }
    

        return (
        <div className="container">
            <div className="card-body">
                <form id="create-form" className='notes-form'>
                    <div className="form-group">
                        <center>General</center>
                        Descriptive Name:<input name="descriptiveName" id="descriptiveName" onChange={this.handleChange} type="text" className="form-control" defaultValue={this.props.note.descriptiveName} style={ { display: 'inline-block', width: '500px', margin: 10} }/> :
                        <label htmlFor="rideType">Ride type:</label>
                        <select name="rideType" id="rideType" onChange={this.handleChange} defaultValue={this.props.note.rideType} type="text" className="form-control" style={ { display: 'inline-block', width: '100px', margin: 10} }>
                            <option value="" disabled hidden>Choose a ride type:</option>
                            <option value="Flat">Flat</option>
                            <option value="Hilly">Hilly</option>
                            <option value="Big climb">Big Climb</option>
                        </select> 
                    </div>

                    <hr></hr>
                    <div className="form-group">
                        <center>Pre-ride</center>
                        <label htmlFor="enthusiasm">Enthusiasm:</label>
                        <select name="enthusiasm" defaultValue={this.props.note.enthusiasm} id="enthusiasm" onChange={this.handleChange} type="text" className="form-control" style={ { display: 'inline-block', width: '70px', margin: 10} }>
                            <option value="" disabled hidden>Choose level of enthusiasm:</option>
                            <option value="1">1 - low</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5 - very excited</option>
                        </select>
                        Weight:<input name="weight" id="weight" onChange={this.handleChange} type="text" className="form-control" defaultValue={this.props.note.weight} style={ { display: 'inline-block', width: '70px', margin: 10} }/>
                        Resting BP:<input name="restingBP" id="restingBP" onChange={this.handleChange} type="text" className="form-control" defaultValue={this.props.note.restingBP} style={ { display: 'inline-block', width: '70px', margin: 10} }/>
                        Resting HR:<input name="heartrate" id="heartrate" onChange={this.handleChange} type="text" className="form-control" defaultValue={this.props.note.heartrate} style={ { display: 'inline-block', width: '50px', margin: 10} }/>
                        Diet Yesterday:<input name="dietYesterday" id="dietYesterday" onChange={this.handleChange} type="text" className="form-control" defaultValue={this.props.note.dietYesterday} style={ { display: 'inline-block', width: '100px', margin: 10} }/>
                        <label htmlFor="sleep">Sleep:</label>
                        <select name="sleep" defaultValue={this.props.note.sleep} id="sleep" onChange={this.handleChange} type="text" className="form-control" style={ { display: 'inline-block', width: '100px', margin: 10} }>
                            <option value="" disabled hidden>Choose sleep type:</option>
                            <option value="1">1 - horrible</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5 - excellent</option>
                        </select>

                    </div>
                    <hr></hr>
                    <div className="form-group">
                        <center>Post-ride</center>
                        <label htmlFor="notes">Notes:</label>
                        <textarea name="notes" id="notes" onChange={this.handleChange} className="form-note-control" defaultValue={this.props.note.notes} rows="3" style={ { display: 'inline-block', width: '600px', margin: 10} } />
                        General Ride Weather: <input name="weather" id="weather" onChange={this.handleChange} type="text" className="form-control" defaultValue={this.props.note.weather} style={ { display: 'inline-block', width: '150px', margin: 10} } />
                     </div>

                    <button onClick={this.handleSubmit} type="submit" className="btn-success">Submit</button>
                    <button onClick={hideNotes} type="submit" className="btn-success">Hide</button>
                </form>
            </div>
        </div>
        )
    }
}


export default connect(
    ({
        note: { note, displayNote },
        ride: { selectedRide }
    }) => ({ note, displayNote, selectedRide } ),
    { showNotes, hideNotes, addNote, editNote }
)(Note);



//export default connect(mapStateToProps, { addNote })(CreateNote)