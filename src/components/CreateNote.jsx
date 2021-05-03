import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote } from '../actions/noteActions'


class CreateNote extends Component {
    state = {
        notes: "",
        weather: "",
        weight: "",
        restingBP: ""
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleClick = (event) => {
        event.preventDefault()

        const rideNote = {
            rideName: this.props.summary.ride.rideName,
            notes: this.state.notes,
            weather: this.state.weather,
            weight: this.state.weight,
            restingBP: this.state.restingBP
        }

        this.props.addNote(rideNote)
        
        this.setState({
            notes: "",
            weather: "",
            weight: "",
            restingBP: ""
        })
        document.getElementById("create-form").reset()

    }

    render () {
    return <div className="container">
        <h1>Create Note</h1>
        <form id="create-form">
            <div className="form-group">
                <textarea name="notes" onChange={this.handleChange} className="form-control" placeholder="Notes" rows="3"/>
            </div>
            <div className="form-group">
                <input name="weather" onChange={this.handleChange} type="text" className="form-control" placeholder="Weather"/>   
            </div>
            <div className="form-group">
                <input name="weight" onChange={this.handleChange} type="text" className="form-control" placeholder="Weight"/>
            </div>
            <div className="form-group">
                <input name="restingBP" onChange={this.handleChange} type="text" className="form-control" placeholder="Resting BP"/>
            </div>
            <button onClick={this.handleClick} type="submit" className="btn btn-success">Submit</button>
        </form>
    </div>
    }
}

const mapStateToProps = (state) => ({
    summary: state.summary
})

export default connect(mapStateToProps, { addNote })(CreateNote)