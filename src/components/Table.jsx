
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSummaries } from '../actions/summaryActions';
import { selectRide, clearMapOverlay, setRideIndex } from '../actions/rideActions';
import { getNote } from '../actions/noteActions';
import Logout from './Logout'


const columnsImperial = [
    { title: "Ride Name", field: "rideName"},
    { title: "Start Time", field: "startTime"},
    { title: "Stop Time", field: "stopTime"},
    { title: "Distance (miles)", field: "distance"},
    { title: "Max Heart Rate", field: "maxHeartRate"},
    { title: "Average Heart Rate", field: "avgHeartRate"},
    { title: "Max Speed (mi/h)", field: "maxSpeed"},
    { title: "Average Speed (mi/h)", field: "averageSpeed" }

]

const columnsMetric = [
    { title: "Ride Name", field: "rideName"},
    { title: "Start Time", field: "startTime"},
    { title: "Stop Time", field: "stopTime"},
    { title: "Distance (meters)", field: "distance"},
    { title: "Max Heart Rate", field: "maxHeartRate"},
    { title: "Average Heart Rate", field: "avgHeartRate"},
    { title: "Max Speed (m/h)", field: "maxSpeed"},
    { title: "Average Speed (m/h)", field: "averageSpeed" }

]

export default function Table() {

    console.log("Table render");
    const dispatch = useDispatch()
    const summaries = useSelector(state => state.summary.summaries)
    const rider = useSelector(state => state.auth.rider)

    useEffect(() => {
        console.log("Table: useEffect()")
        //dispatch(getSummaries())
    }, [dispatch])

    function handleClick(event, data) {
        console.log("Table: handleClick() data:", data);
        dispatch(selectRide(data));
        dispatch(setRideIndex(0));
        dispatch(getNote(data.rideName));
    }

 

    function handleButtonClickGetSummaries() {
        dispatch(getSummaries());
    }

    console.log("Rendering Table for rider:", rider.username, "", summaries.length, "summaries");
    dispatch(clearMapOverlay());

   

    return (

            <div className="containers">
                <button onClick={handleButtonClickGetSummaries} className="btn btn-secondary">Refresh Summaries</button>
 
                <MaterialTable 
                    columns={rider.units === 'imperial' ? columnsImperial : columnsMetric}
                    data={summaries}
                    title="Ride Summaries"
                    options={{ draggable: true }}
                    onRowClick={handleClick}
                />

                <Logout />

                    
            </div>
        )
    
}
