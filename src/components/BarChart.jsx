import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = ({ subject, toggle }) => {
    const [names, setNames] = useState([]);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/results/${subject}`).then((response) => response.json())
        .then((actualData) => {
            let n = actualData.map(d => d.student_name)
            let s = actualData.map(d => d.score)
            setNames(n)
            setScores(s)
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, [toggle])

    const state = {
        labels: names,
        datasets: [{
            label: `${subject} Result`,
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
    function checkMax() {
        return Math.max.apply(Math, scores)
    }
    function checkMean() {
        let sum = 0
        for (let i  of scores) {
            sum += i
        }
        return sum / scores.length
    }
    function checkMin() {
        return Math.min.apply(Math, scores)
    }
    return (
        <div className='border' style={{width:'50%', margin:'auto', boxShadow:'none'}}>
            <h2>Class Results for {subject}</h2>
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
            <h3>Highest score: {checkMax()}</h3>
            <h3>Mean score: {checkMean()}</h3>
            <h3>Lowest score: {checkMin()}</h3>
        </div>
    )
}

export default BarChart
