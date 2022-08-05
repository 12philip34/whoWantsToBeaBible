import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'
import api from '../services/api';


const Admin = () => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [options, setOptions] = useState('');

    // const navigate = useNavigate()

    const handleQuestion = (e) => {
        setQuestion(e.target.value);
    }

    const handleAnswer = (e) => {
        setAnswer(e.target.value);
    }
    // function to update state of password with
    // value enter by user in form
    const handleOptions = (e) => {
        setOptions(e.target.value);
    }

    const submit = async () => {
        const res = await api.post('quiz', {
            question,
            answer,
            options
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        if (res) {
           console.log(res)
        }
    }


    return (
        <div>
            Create Quiz
            <label>Question</label><br />
            <input className='form_input' placeholder="Question" required onChange={(e) => { handleQuestion(e) }} /><br />
            <label>Answer:</label><br />
            <input className='form_input' placeholder="Answer" required onChange={(e) => { handleAnswer(e) }} /><br />
           
            <label>Options:</label><br />
            <input className='form_input' placeholder="Enter options (separate with comma)" required onChange={(e) => { handleOptions(e) }} /><br />
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default Admin