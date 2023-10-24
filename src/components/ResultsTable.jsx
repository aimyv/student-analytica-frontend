import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ResultsTable = ({ toggle }) => {
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
                    <TableCell style={{color: 'white'}}>ID</TableCell>
                    <TableCell style={{color: 'white'}}>Student</TableCell>
                    <TableCell style={{color: 'white'}}>Subject</TableCell>
                    <TableCell style={{color: 'white'}}>Score</TableCell>
                </TableRow>
                </TableHead>
                <TableBody style={{backgroundColor: 'rgba(27,27,39,1)'}}>
                {data.map((item, index) => (
                    <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell style={{color: 'white'}}>{item.id}</TableCell>
                    <TableCell style={{color: 'white'}}>{item.student_name}</TableCell>
                    <TableCell style={{color: 'white'}}>{item.subject}</TableCell>
                    <TableCell style={{color: 'white'}}>{item.score}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default ResultsTable
