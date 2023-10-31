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
import axios from 'axios';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const RadarChart = ({ student_name, toggle, setToggle }) => {
    // to read and set student results for each subject
    const [maths, setMaths] = useState({
        'score': 0,
        'feedback': ''
    })
    const [english, setEnglish] = useState({
        'score': 0,
        'feedback': ''
    })
    const [science, setScience] = useState({
        'score': 0,
        'feedback': ''
    })
    const [art, setArt] = useState({
        'score': 0,
        'feedback': ''
    })
    const [history, setHistory] = useState({
        'score': 0,
        'feedback': ''
    })
    const [strategy, setStrategy] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/students/${student_name}/results`).then((response) => response.json())
        .then((actualData) => {
            // filter all maths results
            let m = actualData.filter(d => d.subject==='Maths')
            // update state with latest maths result
            if (m.length !== 0) {
                setMaths({
                    'score': m[m.length-1].score,
                    'feedback': m[m.length-1].feedback
                })
            }
            let e = actualData.filter(d => d.subject==='English')
            if (e.length !== 0) {
                setEnglish({
                    'score': e[e.length-1].score,
                    'feedback': e[e.length-1].feedback
                })
            }
            let s = actualData.filter(d => d.subject==='Science')
            if (s.length !== 0) {
                setScience({
                    'score': s[s.length-1].score,
                    'feedback': s[s.length-1].feedback
                })
            }
            let a = actualData.filter(d => d.subject==='Art')
            if (a.length !== 0) {
                setArt({
                    'score': a[a.length-1].score,
                    'feedback': a[a.length-1].feedback
                })
            }
            let h = actualData.filter(d => d.subject==='History')
            if (h.length !== 0) {
                setHistory({
                    'score': h[h.length-1].score,
                    'feedback': h[h.length-1].feedback
                })
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
                data: [maths['score'], english['score'], science['score'], art['score'], history['score']],
                backgroundColor: 'rgba(85, 205, 76, 0.2)',
                borderColor: 'rgba(85, 205, 76, 1)',
                borderWidth: 1,
            },
        ],
    };

    function checkMin() {
        let weak = Math.min(maths['score'], english['score'], science['score'], art['score'], history['score'])
        if (weak === maths['score']) {
            return 'Maths'
        } else if (weak === english['score']) {
            return 'English'
        } else if (weak === science['score']) {
            return 'Science'
        } else if (weak === art['score']) {
            return 'Art'
        } else if (weak === history['score']) {
            return 'History'
        }
    }

    function checkMax() {
        let strong = Math.max(maths['score'], english['score'], science['score'], art['score'], history['score'])
        if (strong === maths['score']) {
            return 'Maths'
        } else if (strong === english['score']) {
            return 'English'
        } else if (strong === science['score']) {
            return 'Science'
        } else if (strong === art['score']) {
            return 'Art'
        } else if (strong === history['score']) {
            return 'History'
        }
    }

    async function handleResponse() {
        // handles response from openai
        let message = []
        if (maths['feedback'] != '') {
            message.push(`My maths feedback says: "${maths['feedback']}" How can I improve?`)
        }
        if (english['feedback'] != '') {
            message.push(`My english feedback says: "${english['feedback']}" How can I improve?`)
        }
        if (science['feedback'] != '') {
            message.push(`My science feedback says: "${science['feedback']}" How can I improve?`)
        }
        if (art['feedback'] != '') {
            message.push(`My art feedback says: "${art['feedback']}" How can I improve?`)
        }
        if (history['feedback'] != '') {
            message.push(`My history feedback says: "${history['feedback']}" How can I improve?`)
        }
        const feedback = {
            "message": message.toString()
        }
        console.log(feedback)
        const response = await axios.post('http://localhost:5000/report', feedback)
        setStrategy(response.data.content)
        setToggle(prevState => !prevState)
    }
    
    return (
        <div className='border2 studentResults'>
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
            <div className='studentResultsFooter'>
                <div>
                    <h3>Strongest area: {checkMax()}</h3>
                    <h3>Weakest area: {checkMin()}</h3>
                </div>
                <button className='btn btn--lg' style={{backgroundColor: 'rgb(90, 143, 107)', color: 'white'}} onClick={handleResponse}>Generate Report</button>
            </div>
            <br/>
            <p>{strategy}</p>
        </div>
    )
}

export default RadarChart
