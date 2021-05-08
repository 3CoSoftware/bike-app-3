import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getSummaries, getRide, getOverlay } from "../actions/summaryActions";
import { getNote } from "../actions/noteActions";
import PropTypes from 'prop-types'
import MaterialTable from "material-table";


class Table extends Component {

    componentDidMount() {
        this.props.getSummaries();
    }

    handleClick = (event, data) => {
        this.props.getRide(data)
        this.props.getOverlay(data.rideName)
        this.props.getNote(data.rideName)
        
    }
    
    render() {
        const { summaries } = this.props.summary 
        return (
            <div className="containers">
                <MaterialTable 
                    columns={[
                        { title: "Ride Name", field: "rideName"},
                        { title: "Start Time", field: "startTime"},
                        { title: "Stop Time", field: "stopTime"},
                        { title: "Distance", field: "distance"},
                        { title: "Max Heart Rate", field: "maxHeartRate"},
                        { title: "Average Heart Rate", field: "avgHeartRate"},
                        { title: "Max Speed", field: "maxSpeed"},
                        { title: "Average Speed", field: "averageSpeed" }

                    ]}
                    data={summaries}
                    title="Ride Summaries"
                    options={{ draggable: true }}
                    onRowClick={this.handleClick}
                />

                    
            </div>
        )
    }
}

Table.propTypes = {
    getSummaries: PropTypes.func.isRequired,
    summary: PropTypes.object.isRequired,
    getNote: PropTypes.func,
    getRide: PropTypes.func,
    getOverlay: PropTypes.func
}

const mapStateToProps = (state) => ({
    summary: state.summary
})

export default connect(mapStateToProps, { getSummaries, getNote, getRide, getOverlay })(Table)