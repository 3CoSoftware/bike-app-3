import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRideIndex } from '../actions/rideActions'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList } from 'recharts';
import { scalePow, scaleLog } from 'd3-scale';
import { DefaultTooltipContent } from 'recharts/lib/component/DefaultTooltipContent';


const scale = scaleLog().base(10).nice();
const specifiedDomain = [0.01, 'auto'];
const specifiedTicks = [0.01, 0.1, 1, 10, 100, 1000];
const specifiedMargin = { top: 20, right: 20, bottom: 20, left: 20 };

const gradeSmoothingFactor = 5;

class Graph extends Component {

  state = { opacity: 1, brushStartIndex:  0, brushEndIndex: 0};

  static displayName = 'LineChartDemo';
  brushStartIndex = 0;
  brushEndIndex = 0;

  handleLegendMouseEnter = () => {
    this.setState({
      opacity: 0.5,
    });
  };


  handleLegendMouseLeave = () => {
    this.setState({
      opacity: 1,
    });
  };




  handleBrush = (event) => {
    this.brushStartIndex = event.startIndex;
    this.brushEndIndex = event.endIndex;
  }  

  renderTooltip = props => {
    // payload[0] doesn't exist when tooltip isn't visible
    //console.log("renderTT props:", props);
    if (props.active && props.payload) {
      
      this.props.setRideIndex(props.payload[0].payload.index);
      const newPayload = [
        {
          name: 'Altitude',
          value: parseFloat(props.payload[0].payload.altitude)+' feet'
        },
        {
          name: 'Enhanced Altitude',
          value: parseFloat(props.payload[0].payload.enhancedAltitude)+' feet'
        },
        {
          name: 'Grade',
          value: parseFloat(props.payload[0].payload.percentGrade)+' %'
        },
        {
          name: 'Averaged Grade',
          value: parseFloat(props.payload[0].payload.averagedGrade)+' %'
        },
        {
          name: 'Heart Rate',
          value: parseFloat(props.payload[0].payload.heartRate)+' bpm'
        },
        {
          name: 'Speed',
          value: parseFloat(props.payload[0].payload.speed)+' mph'
        },
        {
          name: 'Temperature',
          value: parseFloat(props.payload[0].payload.temperature)+' ℉'
        },
        {
          name: 'Raw Altitude',
          value: props.payload[0].payload.rawAltitude
        },
        {
          name: 'Raw Speed',
          value: props.payload[0].payload.rawSpeed
        },
        {
          name: '@ Distance',
          value: parseFloat(props.payload[0].payload.distance)+' miles'
        }
      ];
  
      // we render the default, but with our overridden payload
      return <DefaultTooltipContent payload={newPayload} />;
    }
    
  
    // we just render the default
    return <DefaultTooltipContent {...props} />;
  };

  handleClickDot = (event, data) => {}

  handleLineClick = (event, data) => {}

  handleMouseOver = (event, data) => {
    console.log("Graph: handleMouseOver() event:", event, "data:", data);
  }


  render() {

    const AxisLabel = ({ axisType, x=0, y=0, width, height, stroke, children }) => {
      const isVert = axisType === 'yAxis';
      const cx = isVert ? x : x + (width / 2);
      const cy = isVert ? (height / 2) + y : y + height + 10;
      const rot = isVert ? `270 ${cx} ${cy}` : 0;
      return (
        <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
          {children}
        </text>
      );
    };

    const { rideData, selectedRide, rider, graphType } = this.props;
    console.log("Graph render type:", graphType);
    const { opacity } = this.state;


    let dataToPlot = [];

    let maxAltitude = 0.0;
    let minTemperature = 500.0;
    let maxTemperature = 0.0;
    let minHeartRate = 500.0;
    let maxHeartRate = 0.0;
    let previousAltitude = 0.0;
    let previousDistance = 0.0;
    let grade = 0.0;
    let averagedGrade = 0.0;
    let doGradeCalc = false;
    
    let index = 0;
    rideData.forEach(entry => { 
      let rawAltitude = parseFloat(entry["altitude"]);
      if (rawAltitude > maxAltitude) maxAltitude = rawAltitude;
      //wait for altitude to stabalize before beginning grade calculation
      if (rawAltitude >= 0 && !doGradeCalc) {
        doGradeCalc = true;
      }
      let rawTemperature = parseFloat(entry["temperature"]);
      if(rawTemperature > maxTemperature) maxTemperature = rawTemperature;
      if(rawTemperature < minTemperature) minTemperature = rawTemperature;
      let rawSpeed = parseFloat(entry["speed"]);
      if(doGradeCalc) {
        let verticalClimb = parseFloat(entry["altitude"]).toFixed(2) - previousAltitude;
        let horizontalDistance = parseFloat(entry["distance"]).toFixed(2) - previousDistance;
        if(horizontalDistance > 0.25 && rawSpeed > 0) {
          grade = parseFloat((verticalClimb/horizontalDistance)*100).toFixed(2);
          averagedGrade -= averagedGrade / gradeSmoothingFactor;
          averagedGrade += grade / gradeSmoothingFactor;
        }
        else {
          grade = 0;
        }
        previousAltitude = parseFloat(entry["altitude"]);
        previousDistance = parseFloat(entry["distance"]);
      }

      let convDistance = 0;
      let convSpeed = 0;
      let convAltitude = 0;
      let convEnhancedAltitude = 0;
      let convTemperature = 0;
      if(rider.units === 'imperial') {
          convDistance = parseFloat(entry["distance"] / 1609.344).toFixed(2);
          convSpeed = parseFloat(entry["speed"] * 2.237).toFixed(2);
          convAltitude = parseFloat(entry["altitude"] * 3.2808).toFixed(2);
          convEnhancedAltitude = parseFloat(entry["enhancedAltitude"] * 3.2808).toFixed(2);
          convTemperature = parseFloat((entry["temperature"] * (9/5)) + 32).toFixed(2);
      }
      else if(rider.units === 'metric') {
          convDistance = parseFloat(entry["distance"] / 1000).toFixed(2);
          convSpeed = parseFloat(entry["speed"] * 3.6).toFixed(2);
          convAltitude = parseFloat(entry["altitude"]).toFixed(2);
          convEnhancedAltitude = parseFloat(entry["enhancedAltitude"]).toFixed(2);
          convTemperature = parseFloat(entry["temperature"]).toFixed(2);
      }
      let hr = entry["heartRate"];
      if(hr > maxHeartRate) maxHeartRate = hr;
      if(hr < minHeartRate) minHeartRate = hr;
         
      dataToPlot.push({index: index, speed: convSpeed, distance: convDistance, altitude: convAltitude, enhancedAltitude: convEnhancedAltitude, temperature: convTemperature, heartRate: hr, percentGrade: grade, averagedGrade: parseFloat(averagedGrade).toFixed(2), rawAltitude: entry["altitude"], rawDistance: entry["distance"], rawSpeed: rawSpeed });
      ++index;
    });

    let minY = 0;
    let maxY = 20;
    let xAxisLabel = "Distance (miles)";
    let xWhatToPlot = "distance";
    let yAxisLabel = "Speed (mph)";
    let yWhatToPlot = "speed";

    if(graphType == 'speed') {
      yWhatToPlot = "speed";
      minY = 0;
      // obtain max speed from summary, already converted to correct units
      maxY = parseFloat(selectedRide.maxSpeed);
      if(rider.units === 'imperial') {
        yAxisLabel = "Speed (mph)";
      }
      else {
        yAxisLabel = "Speed (km/h)";
      }
    }
    else if(graphType == 'altitude' || graphType == 'enhancedAltitude') {
      yWhatToPlot = "altitude";
      minY = 0;
      if(rider.units === 'imperial') {
        yAxisLabel = "Elevation (feet)";
        maxY = maxAltitude * 3.2808;
      }
      else {
        yAxisLabel = "Elevation (meters)";
        maxY = maxAltitude;
      }
    }
    else if(graphType == 'heartRate') {
      yWhatToPlot = "heartRate";
      
      minY = minHeartRate;
      //round up to nearest 10
      maxY = Math.ceil((parseFloat(selectedRide.maxHeartRate)+1)/10)*10;
      yAxisLabel = "Heart Rate (bpm)";
    }
    else if(graphType == 'temperature') {
      yWhatToPlot = "temperature";
      
      if(rider.units === 'imperial') {
        yAxisLabel = "Temperature (deg F)";
        minY = (minTemperature * (9/5)) + 32;
        maxY = (maxTemperature * (9/5)) + 32;
      }
      else {
        yAxisLabel = "Temperature (deg C)";
        minY = minTemperature;
        maxY = maxTemperature;
      }
    }
    else if(graphType == 'percentGrade') {
      yWhatToPlot = "percentGrade";
      minY = -30;
      maxY = 30;
      yAxisLabel = "% Grade";
    }
    else if(graphType == 'averagedGrade') {
      yWhatToPlot = "averagedGrade";
      minY = -30;
      maxY = 30;
      yAxisLabel = "Avg % Grade";
    }

    console.log("data:", dataToPlot); 

    return (
      
      <div className="line-charts">
        <div className="line-chart-wrapper">
          <LineChart className="lower-graph"
            data={dataToPlot}
            margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
            height={200}
            width={1000} 
          >
            <CartesianGrid vertical={false} />
            <Legend
              onMouseEnter={this.handleLegendMouseEnter}
              onMouseLeave={this.handleLegendMouseLeave}
            />
            <XAxis dataKey="distance"  tick={{ fontSize: 12 }}  stroke='blue' />
            <YAxis 
              domain={[minY, maxY]} 
              label={<AxisLabel axisType='yAxis' x={25} y={125} width={0} height={0} stroke='purple'>{yAxisLabel}</AxisLabel>}
              scale="linear" 
              tick={{ fontSize: 12}}
              yAxisId={0}
            />
            <YAxis 
              domain={[0, 1000]} 
              label={<AxisLabel axisType='yAxis' x={25} y={125} width={0} height={0} stroke='purple'>feet</AxisLabel>}
              scale="linear" 
              tick={{ fontSize: 12}}
              yAxisId={1}
            />
            <Tooltip
              wrapperStyle={{
                top: '10px',
                borderColor: 'blue',
                boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
                fontSize: '12px',
                margin: 1
              }}
              contentStyle={{ backgroundColor: 'red' }}
              labelStyle={{ fontWeight: 'bold', color: '#666666' }}
              content={this.renderTooltip}
              position={{ y: -200 }}
            />
            <Line 
              dataKey={yWhatToPlot}
              stroke="purple" 
              dot={false}  
              strokeOpacity={opacity} 
              activeDot={{ onClick: this.handleClickDot }}
              onClick={this.handleLineClick}
              yAxisId={0}
            />
            <Line 
              dataKey='altitude'
              stroke="red" 
              dot={false}  
              yAxisId={1}
            />
            <div></div>
            <Brush dataKey={xWhatToPlot} startIndex={0} height={50} onChange={this.handleBrush}>
              <AreaChart>
                <CartesianGrid />
                <YAxis hide domain={['auto', maxY]} />
                <Area dataKey={yWhatToPlot} stroke="#ff7300" fill="#ff7300" dot={false} />
              </AreaChart>
            </Brush>
          </LineChart>
          <center>{xAxisLabel}</center>
        </div>

      </div>
    );
  }
}

export default connect(
  ({
      ride: { rideData, selectedRide, graphType },
      auth: { rider }
  }) => ({ rideData, selectedRide, rider, graphType } ),
  { setRideIndex }
)(Graph);