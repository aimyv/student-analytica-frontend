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
        <br/>
        <h1 style={{fontSize: '400%'}}>Student Analytica</h1>
        <br/>
        <LogOut className='header--link' onClick={handleUserLogout} style={{position: 'fixed', top: '2%', right: '1%'}} />
        <ResultForm toggle={toggle} setToggle={setToggle} />
        <br />
        <ResultsTable toggle={toggle} setToggle={setToggle} />
        <br/>
        <BarChart subject='Maths' toggle={toggle}/>
        <br />
        <RadarChart student_name='Tom' toggle={toggle} />
        <br />
        </div>
    )
}

export default Dashboard
