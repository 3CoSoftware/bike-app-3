import React from 'react'
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import Table from './Table'
import { useSelector } from 'react-redux'
import './Home.css'

export const Home = () => {
    const rider = useSelector(state => state.auth.rider)
    return (
        <div>
            {
                !rider ?
                <div className="home">
                    <RegisterModal />
                    <LoginModal />
                </div> :
                <div>
                    <h2 className="welcome">Welcome, {rider.username}</h2>
                    <Table />
                </div>
                
                
            }
            
        </div>
    )
}
