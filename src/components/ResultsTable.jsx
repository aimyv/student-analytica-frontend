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
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/results`).then((response) => response.json())
        .then((actualData) => {
            setData(actualData.reverse());
        })
        .catch((err) => {
            console.log(err.message);
        });
        
    }, [toggle])
    return (
        <>
        <TableContainer component={Paper} style={{width:'50%', margin:'auto', border: 'solid 1px rgb(90, 143, 107)'}}>
            <Table size="small">
                <TableHead style={{backgroundColor: 'rgb(90, 143, 107)'}}>
                <TableRow>
                    <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>ID</TableCell>
                    <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>Student</TableCell>
                    <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>Subject</TableCell>
                    <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>Score</TableCell>
                </TableRow>
                </TableHead>
                <TableBody style={{backgroundColor: 'rgba(27,27,39,1)'}}>
                {data.map((item, index) => (
                    <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>{item.id}</TableCell>
                    <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>{item.student_name}</TableCell>
                    <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}}>{item.subject}</TableCell>
                    <TableCell style={{color: 'white', fontFamily: 'Montserrat, sans-serif', display: 'flex', justifyContent: 'space-between'}}><div>{item.score}</div><Trash2 className='delete--btn' onClick={async() => {
                        await axios.delete(`http://127.0.0.1:5000/results/${item.id}`)
                        setToggle(!toggle)
                        }}/></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default ResultsTable
