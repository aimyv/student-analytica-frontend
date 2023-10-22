import React from 'react'
import { LogOut } from 'react-feather'
import { userAuth } from '../utils/AuthContext'

const Dashboard = () => {
    const {user, handleUserLogout} = userAuth()
    return (
        <div>
        <h2>Welcome {user.username}</h2>
        <LogOut className='header--link' onClick={handleUserLogout} />
        </div>
    )
}

export default Dashboard
