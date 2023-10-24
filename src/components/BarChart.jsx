import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = ({ subject, toggle }) => {
    const [names, setNames] = useState([]);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/results/${subject}/average`).then((response) => response.json())
        .then((actualData) => {
            let n = actualData[0]
            setNames(n)
            let s = actualData[1]
            setScores(s)
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, [toggle])

    const state = {
        labels: names,
        datasets: [{
            label: `${subject} Average`,
            data: scores,
            backgroundColor: [
                'rgba(85, 205, 76, 0.3)'
            ],
            borderColor: [
                'rgb(85, 205, 76)'
            ],
            borderWidth: 1,
        }]
    }

    function checkMean() {
        let sum = 0
        for (let i  of scores) {
            sum += i
        }
        return Math.round(sum / scores.length)
    }

    return (
        <div className='border2' style={{width:'50%', margin:'auto'}}>
            <h2>Class Averages for {subject}</h2>
            <br/>
            <Bar
                data={state}
                options={{
                    scales: {
                        x: {
                            ticks: {
                            color: 'white'
                            },
                            grid: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        y: {
                            ticks: {
                            color: 'white'
                            },
                            grid: {
                                color: 'rgba(255,255,255,0.1)'
                            },
                            beginAtZero: true
                        }
                    }
                }}
            />
            <br/>
            <h3>Mean Average of Class: {checkMean()}</h3>
        </div>
    )
}

export default BarChart
