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

        setResult({...result, [name]: value})
    }

    const addResult = async (e, res) => {
        e.preventDefault()
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
        <div className='border2' style={{width: '50%', margin: 'auto', boxShadow: 'none'}}>
                <h2>Add Result</h2>
                <br />
                <div className='form-wrapper'>
                    <form onSubmit={ (e) =>  { addResult(e, result) } }>
                        <div className='field--wrapper'>
                            <label>Name:</label>
                            <input type='text' 
                            required 
                            name='student_name' 
                            placeholder='Enter student name'
                            value={result.student_name}
                            onChange={handleInputChange} />
                        </div>

                        <div className='field--wrapper'>
                            <label>Subject:</label>
                            <select 
                            required 
                            name="subject" 
                            onChange={handleInputChange}>
                            <option value="Maths">Maths</option>
                            <option value="English">English</option>
                            <option value="Science">Science</option>
                            <option value="Art">Art</option>
                            <option value="History">History</option>
                            </select>
                        </div>

                        <div className='field--wrapper'>
                            <label>Percentage Score:</label>
                            <input type='number' 
                            required 
                            name='score' 
                            value={result.score}
                            onChange={handleInputChange} />
                        </div>

                        <div className='field--wrapper'>
                            <label>Feedback:</label>
                            <textarea 
                            required 
                            maxLength='300' 
                            placeholder='Write feedback' 
                            name='feedback'
                            value={result.feedback}
                            onChange={handleInputChange} >
                            </textarea>
                        </div>

                        <div className='field--wrapper'>
                            <input className='btn btn--lg btn--main' 
                            type='submit'
                            value='Add Result'  />
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default ResultForm
