import React from 'react'
import { LogOut } from 'react-feather'
import { userAuth } from '../utils/AuthContext'
import ResultsTable from '../components/ResultsTable'
import ResultForm from '../components/ResultForm'
import BarChart from '../components/BarChart'

const Dashboard = () => {
    const {user, handleUserLogout} = userAuth()
    return (
        <div>
        <h1 style={{textAlign: 'left'}}>Welcome {user.username}</h1>
        <br/>
        <LogOut className='header--link' onClick={handleUserLogout} style={{position: 'fixed', top: '2%', right: '1%'}} />
        <ResultForm/>
        <br />
        <ResultsTable/>
        <br/>
        <BarChart subject='maths'/>
        </div>
    )
}

export default Dashboard
