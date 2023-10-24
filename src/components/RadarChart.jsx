import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const RadarChart = ({ student_name, toggle }) => {
    const [maths, setMaths] = useState(0)
    const [english, setEnglish] = useState(0)
    const [science, setScience] = useState(0)
    const [art, setArt] = useState(0)
    const [history, setHistory] = useState(0)

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/students/${student_name}/results`).then((response) => response.json())
        .then((actualData) => {
            // console.log(actualData[0].score)
            let m = actualData.filter(d => d.subject==='Maths')
            if (m.length === 0) {
                setMaths(0)
            } else {
                setMaths(m[m.length-1].score)
            }
            let e = actualData.filter(d => d.subject==='English')
            if (e.length === 0) {
                setEnglish(0)
            } else {
                setEnglish(e[e.length-1].score)
            }
            let s = actualData.filter(d => d.subject==='Science')
            if (s.length === 0) {
                setEnglish(0)
            } else {
                setScience(s[s.length-1].score)
            }
            let a = actualData.filter(d => d.subject==='Art')
            if (a.length === 0) {
                setArt(0)
            } else {
                setArt(a[a.length-1].score)
            }
            let h = actualData.filter(d => d.subject==='History')
            if (h.length === 0) {
                setHistory(0)
            } else {
                setHistory(h[h.length-1].score)
            }
            
            
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, [toggle])

    const data = {
        labels: ['Maths', 'English', 'Science', 'Art', 'History'],
        datasets: [
            {
                label: `${student_name}'s latest exam result`,
                data: [maths, english, science, art, history],
                backgroundColor: 'rgba(85, 205, 76, 0.2)',
                borderColor: 'rgba(85, 205, 76, 1)',
                borderWidth: 1,
            },
        ],
    };
    function checkMin() {
        let weak = Math.min(maths, english, science, art, history)
        if (weak === maths) {
            return 'Maths'
        } else if (weak === english) {
            return 'English'
        } else if (weak === science) {
            return 'Science'
        } else if (weak === art) {
            return 'Art'
        } else if (weak === history) {
            return 'History'
        }
    }
    function checkMax() {
        let strong = Math.max(maths, english, science, art, history)
        if (strong === maths) {
            return 'Maths'
        } else if (strong === english) {
            return 'English'
        } else if (strong === science) {
            return 'Science'
        } else if (strong === art) {
            return 'Art'
        } else if (strong === history) {
            return 'History'
        }
    }
    return (
        <div className='border2' style={{width:'50%', margin:'auto'}}>
            <h2>{student_name}</h2>
            <br/>
            <Radar 
                data={data}
                options={{
                    scales: {
                        r: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            grid: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        }
                    }
                }}
            />
            <br/>
            <h3>Strongest area: {checkMax()}</h3>
            <h3>Weakest area: {checkMin()}</h3>
        </div>
    )
}

export default RadarChart
