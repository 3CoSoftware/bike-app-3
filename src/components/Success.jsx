import React from 'react';
import { Link } from "react-router-dom";


export default function Success() {
    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Note Created</h3>
                    <Link to="/"><button className="btn btn-primary">Back</button></Link>
                </div>
            </div>
        </div>
    )
}
