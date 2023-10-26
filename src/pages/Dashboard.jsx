import React, { useState, useEffect } from 'react'
import { LogOut } from 'react-feather'
import { userAuth } from '../utils/AuthContext'
import ResultsTable from '../components/ResultsTable'
import ResultForm from '../components/ResultForm'
import BarChart from '../components/BarChart'
import RadarChart from '../components/RadarChart'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Dashboard = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {user, handleUserLogout} = userAuth()
    const [toggle, setToggle] = useState(false);

    const [names, setNames] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/students`).then((response) => response.json())
        .then((actualData) => {
            let n = actualData.map(x => x.name)
            setNames(n)
        })
        .catch((err) => {
            console.log(err.message);
        });
        
    }, [toggle])

    return (
        <div>
            <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{
                    style: {
                        backgroundColor: "#55cd4c"
                    }
                }}>
                <Tab label="Results" {...a11yProps(0)}  style={{fontFamily: 'Montserrat', color: 'white'}} />
                <Tab label="Class" {...a11yProps(1)}  style={{fontFamily: 'Montserrat', color: 'white'}} />
                <Tab label="Student" {...a11yProps(2)}  style={{fontFamily: 'Montserrat', color: 'white'}} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <h1>All Results</h1>
                <p>Use the form to enter a student's name as well as their score and feedback for a subject to enter a new result, or view all student results in the table below.</p>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    <h2 id='addResult'>Add Result</h2>
                    <ResultForm toggle={toggle} setToggle={setToggle} />
                </div>
                    <br />
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    <ResultsTable toggle={toggle} setToggle={setToggle} />
                    <h2 id='viewResults'>View Results</h2>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <h1>Class Results by Subject</h1>
                <p>View each student's average result for each subject.</p>
                <br/>
                <div className='classGrid'>
                    <BarChart subject='Maths' toggle={toggle}/>
                    <BarChart subject='English' toggle={toggle}/>
                    <BarChart subject='Science' toggle={toggle}/>
                    <BarChart subject='Art' toggle={toggle}/>
                    <BarChart subject='History' toggle={toggle}/>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <h1>Student Results</h1>
                <p>View each student's latest result for each subject and generate study strategies based on their latest feedback.</p>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {names.map((item) => (
                        <RadarChart student_name={item} toggle={toggle}  setToggle={setToggle} />
                    ))}
                </div>
            </CustomTabPanel>
            </Box>
        <LogOut className='header--link' onClick={handleUserLogout} style={{position: 'fixed', top: '1.5%', right: '1%'}} />
        </div>
    )
}

export default Dashboard
