import React from 'react';
import { Link } from "react-router-dom";
import './Success.css'


export default function Success() {
    return (
        <div className="container" id="success-container">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Note Updated</h3>
                    <Link to="/ride"><button className="btn btn-primary">Back</button></Link>
                </div>
            </div>
        </div>
    )
}
