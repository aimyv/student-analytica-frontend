import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Trash2 } from 'react-feather'
import axios from 'axios';

const ResultsTable = ({ toggle, setToggle }) => {
    // read and set all results
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/results`).then((response) => response.json())
        .then((actualData) => {
            // lists results in reverse so latest results appear at the top of the table
            setData(actualData.reverse());
        })
        .catch((err) => {
            console.log(err.message);
        });
        
    }, [toggle])

    return (
        <>
        <TableContainer className='results' component={Paper} style={{ border: 'solid 1px white' }}>
            <Table size="small">
                <TableHead style={{backgroundColor: 'rgb(90, 143, 107)'}}>
                    <TableRow>
                        <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>Student</TableCell>
                        <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>Subject</TableCell>
                        <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{backgroundColor: 'rgba(27,27,39,1)'}}>
                {data.map((item, index) => (
                    <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>{item.student_name}</TableCell>
                        <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>{item.subject}</TableCell>
                        <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif', display: 'flex', justifyContent: 'space-between'}}>
                            <div>{item.score}</div>
                            <Trash2 className='delete--btn' onClick={async() => {
                            // deletes result
                            await axios.delete(`http://127.0.0.1:5000/results/${item.id}`)
                            setToggle(prevState => !prevState)
                            }}/>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default ResultsTable
