import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ResultsTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/results').then((response) => response.json())
        .then((actualData) => {
            setData(actualData);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, [data])
    return (
        <>
            <h1>Results Table</h1>
            <br/>
            <TableContainer component={Paper} style={{width:'50%', margin:'auto'}}>
            <Table size="small">
                <TableHead style={{backgroundColor: 'rgb(226, 227, 232)'}}>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Student</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Score</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map((item, index) => (
                    <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.student_name}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.score}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    )
}

export default ResultsTable
