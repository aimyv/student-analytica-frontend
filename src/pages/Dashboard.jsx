import React, { useState } from 'react'
import { LogOut } from 'react-feather'
import { userAuth } from '../utils/AuthContext'
import ResultsTable from '../components/ResultsTable'
import ResultForm from '../components/ResultForm'
import BarChart from '../components/BarChart'
import RadarChart from '../components/RadarChart'

const Dashboard = () => {
    const {user, handleUserLogout} = userAuth()
    const [toggle, setToggle] = useState(false);
    return (
        <div>
        <h1 style={{textAlign: 'left'}}>Welcome {user.username}</h1>
        <br/>
        <LogOut className='header--link' onClick={handleUserLogout} style={{position: 'fixed', top: '2%', right: '1%'}} />
        <ResultForm toggle={toggle} setToggle={setToggle} />
        <br />
        <ResultsTable toggle={toggle}/>
        <br/>
        <BarChart subject='Maths' toggle={toggle}/>
        <br />
        <RadarChart student_name='Momo' toggle={toggle} />
        </div>
    )
}

export default Dashboard
