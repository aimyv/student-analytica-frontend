import React from 'react'
import { LogOut } from 'react-feather'
import { userAuth } from '../utils/AuthContext'
import ResultsTable from '../components/ResultsTable'

const Dashboard = () => {
    const {user, handleUserLogout} = userAuth()
    return (
        <div>
        <h1>Welcome {user.username}</h1>
        <LogOut className='header--link' onClick={handleUserLogout} />
        <ResultsTable/>
        </div>
    )
}

export default Dashboard
