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
        <LogOut className='header--link' onClick={handleUserLogout} style={{position: 'fixed', top: '2%', right: '1%'}} />
        <h1 style={{fontSize: '400%', textAlign: 'center', color: '#55cd4c'}}>Student Analytica</h1>
        <br/>
        <div style={{display: 'flex', justifyContent:'space-between', width: '80%', margin:'auto'}}>
            <ResultForm toggle={toggle} setToggle={setToggle} />
            <BarChart subject='Maths' toggle={toggle}/>
        </div>
        <br /><br />
        <ResultsTable toggle={toggle} setToggle={setToggle} />
        <br />
        <RadarChart student_name='Tom' toggle={toggle} />
        <br />
        </div>
    )
}

export default Dashboard
