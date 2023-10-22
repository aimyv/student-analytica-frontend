import React from 'react'
import { LogOut } from 'react-feather'
import { userAuth } from '../utils/AuthContext'
import ResultsTable from '../components/ResultsTable'
import ResultForm from '../components/ResultForm'

const Dashboard = () => {
    const {user, handleUserLogout} = userAuth()
    return (
        <div>
        <h1>Welcome {user.username}</h1>
        <LogOut className='header--link' onClick={handleUserLogout} />
        <ResultForm/>
        <br />
        <ResultsTable/>
        </div>
    )
}

export default Dashboard
