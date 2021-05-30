import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions'

export default function Logout() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)


    if (!isAuthenticated) {
        return null 
    }
    return (
        <div>
            <button onClick={() => dispatch(logout())} className="btn btn-secondary">Log Out</button>
        </div>
    )
}
