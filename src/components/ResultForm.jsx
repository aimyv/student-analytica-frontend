import React, { useState } from 'react'
import axios from 'axios'

const ResultForm = ({ toggle, setToggle }) => {

    const [result, setResult] = useState({
        "student_name": '',
        "subject": 'Maths',
        "score": '',
        "feedback": ''
    })

    const handleInputChange = (e)  => {
        let name = e.target.name
        let value =  e.target.value
        // sets a field in new result
        setResult({...result, [name]: value})
    }

    const addResult = async (e, res) => {
        e.preventDefault()
        // adds result to table
        setResult({
            student_name: res.student_name,
            subject: res.subject,
            score: res.score,
            feedback: res.feedback,
        })
        await axios.post('http://127.0.0.1:5000/results', result)
        setToggle(prevState => !prevState)
    }

    return (
        <div className='border2 results' style={{border: 'solid 1px white'}}>
                <div className='form-wrapper'>
                    <form onSubmit={ (e) =>  { addResult(e, result) } }>

                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div style={{margin: '5px 0', width: '30%'}}>
                                <input type='text' 
                                required 
                                name='student_name' 
                                placeholder='Enter student name'
                                value={result.student_name}
                                onChange={handleInputChange}
                                />
                            </div>

                            <div style={{margin: '5px 0', width: '30%'}}>
                                <select 
                                required 
                                name="subject" 
                                onChange={handleInputChange}
                                >
                                <option value="Maths">Maths</option>
                                <option value="English">English</option>
                                <option value="Science">Science</option>
                                <option value="Art">Art</option>
                                <option value="History">History</option>
                                </select>
                            </div>

                            <div style={{margin: '5px 0', width: '30%'}}>
                                <input type='number' 
                                required 
                                name='score' 
                                placeholder='Score (%)'
                                value={result.score}
                                onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div style={{margin: '5px 0'}}>
                            <textarea 
                            required 
                            maxLength='300' 
                            placeholder='Write feedback' 
                            name='feedback'
                            value={result.feedback}
                            onChange={handleInputChange}
                            >
                            </textarea>
                        </div>
                        
                        <div className='field--wrapper'>
                            <input className='btn btn--lg' style={{backgroundColor: 'rgb(90, 143, 107)', color: 'white'}}
                            type='submit'
                            value='Add Result ＋'  />
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default ResultForm
