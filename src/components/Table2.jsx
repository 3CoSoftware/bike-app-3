
import MaterialTable from "material-table";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getSummaries } from '../actions/summaryActions'

function Table() {
    const dispatch = useDispatch()
    const summaries = useSelector(state => state.summaries)

    useEffect(() => {
        dispatch(getSummaries())
    }, [dispatch])
    
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
                    // onRowClick={handleClick}
                />

                    
            </div>
        )
    
}

export default Table