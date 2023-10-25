import React, { useState } from 'react'
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
                <div className='resultsGrid'>
                    <h1 style={{fontSize: '300%', width: '100%', margin: 'auto'}}>Add New Result</h1>
                    <ResultForm toggle={toggle} setToggle={setToggle} />
                    <ResultsTable toggle={toggle} setToggle={setToggle} />
                    <h1 style={{fontSize: '300%', width: '100%', margin: 'auto', textAlign: 'right'}}>View All Results</h1>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <h1 style={{fontSize: '300%'}}>Class Results by Subject</h1>
                <div className='classGrid'>
                    <BarChart subject='Maths' toggle={toggle}/>
                    <BarChart subject='English' toggle={toggle}/>
                    <BarChart subject='Science' toggle={toggle}/>
                    <BarChart subject='Art' toggle={toggle}/>
                    <BarChart subject='History' toggle={toggle}/>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <h1 style={{fontSize: '300%'}}>Student Results</h1>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <RadarChart student_name='Tom' toggle={toggle}  setToggle={setToggle} />
                    <RadarChart student_name='Momo' toggle={toggle}  setToggle={setToggle} />
                </div>
            </CustomTabPanel>
            </Box>
        <LogOut className='header--link' onClick={handleUserLogout} style={{position: 'fixed', top: '1.5%', right: '1%'}} />
        </div>
    )
}

export default Dashboard
