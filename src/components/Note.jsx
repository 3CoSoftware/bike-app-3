import React, { Component } from 'react'
import { connect } from 'react-redux'

class Note extends Component {
    render() {
        const note = this.props.note.note[0]
        return (
            <div className="card-body">
                <h5 className="card-title">{note.notes}</h5>
                <p className="card-text"><u>Weather:</u> {note.weather}</p>
                <p className="card-text"><u>Weight:</u> {note.weight}</p>
                <p className="card-text"><u>Resting BP:</u> {note.restingBP}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    note: state.note 
})

export default connect(mapStateToProps, {})(Note)
