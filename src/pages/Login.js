import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../services/api';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    // function to update state of password with
    // value enter by user in form
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const submit = async () => {
        const res = (await api.post('login', {
            email,
            password
        })).data
        console.log(res)

        if (res) {
            localStorage.setItem('token', res.access_token)
            navigate('/admin')
        }
    }


    return (
        <div>
            <label>
                Email:
            </label><br />
            <input className='form_input' type="email" value={email} required onChange={(e) => { handleEmailChange(e) }} /><br />
            {/* when user write in email input className='form_input' box , handleEmailChange()
			function will be called.*/}
            <label>
                Password:
            </label><br />
            <input className='form_input' type="password" value={password} required onChange={(e) => { handlePasswordChange(e) }} /><br />
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default Login