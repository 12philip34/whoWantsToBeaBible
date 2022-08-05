import React, {useState, useEffect} from 'react';
import api from '../services/api';
import '../App.css';
import '../CSS/register.css';


const Apps = ({nextFacet}) => {
	const [name , setName] = useState('');
	const [phoneNumber , setPhoneNumber] = useState('');
	const [email , setEmail] = useState('');
	const [password , setPassword] = useState('');
	const [confPassword , setConfPassword] = useState('');
	// function to update state of name with
	// value enter by user in form
	const handleChange =(e)=>{
	setName(e.target.value);
	}
	// function to update state of age with value
	// enter by user in form
	const handlePhoneNumberChange =(e)=>{
	setPhoneNumber(e.target.value);
	}
   
	// function to update state of email with value
	// enter by user in form
	const handleEmailChange =(e)=>{
	setEmail(e.target.value);
	}
	// function to update state of password with
	// value enter by user in form
	const handlePasswordChange =(e)=>{
	setPassword(e.target.value);
	}
	// function to update state of confirm password
	// with value enter by user in form
	const handleConfPasswordChange =(e)=>{
	setConfPassword(e.target.value);
	}
	// below function will be called when user
	// click on submit button .cf
	const handleSubmit = async (e) =>{
		e.preventDefault()
		const number = document.getElementById('pNumber').value;
		const name = document.getElementById('name').value;
	if(password !== confPassword)
	{
		// if 'password' and 'confirm password'
		// does not match.
		alert("password Not Match");
	}
	else{
		// display alert box with user
		// 'name' and 'email' details .
    localStorage.setItem('gamerNumber', number);
    localStorage.setItem('gamerName', name);

		const res = await api.post('register', {
			name,
			phone: phoneNumber,
			email,
			password
		})

		console.log(res)

        return nextFacet('isQuiz')
	}
	e.preventDefault();

	}

return (
	<div className="App register">
	<header className="App-header box">
	<form onSubmit={(e) => {handleSubmit(e)}}>
	{/*when user submit the form , handleSubmit()
		function will be called .*/}
	<h2>Register here</h2>
	{/* <img src="/gfg.png" /> */}
		<label >
		Name:
		</label><br/>
		<input className='form_input' type="text" value={name} required onChange={(e) =>{handleChange(e)}} id='name' /><br/>
		{ /*when user write in name input className='form_input' box , handleChange()
			function will be called. */}
		<label >
		PhoneNumber:
		</label><br/>
		<input className='form_input' type="text" value={phoneNumber} required onChange={(e) =>{handlePhoneNumberChange(e)}} id='pNumber'/><br/>
			{ /*when user write in age input className='form_input' box , handleAgeChange()
			function will be called. */}
		<label>
		Email:
		</label><br/>
		<input className='form_input' type="email" value={email} required onChange={(e) =>{handleEmailChange(e)}} /><br/>
		{/* when user write in email input className='form_input' box , handleEmailChange()
			function will be called.*/}
		<label>
		Password:
		</label><br/>
		<input className='form_input' type="password" value={password} required onChange={(e) =>{handlePasswordChange(e)}} /><br/>
			{/* when user write in password input className='form_input' box ,
				handlePasswordChange() function will be called.*/}
		<label>
		Confirm Password:
		</label><br/>
		<input className='form_input' type="password" value={confPassword} required onChange={(e) =>{handleConfPasswordChange(e)}} /><br/>
				{/* when user write in confirm password input className='form_input' box ,
					handleConfPasswordChange() function will be called.*/}
		<button type="submit" value="Submit" style={{marginTop:'30px'}}>
           Submit
        </button>
	</form>
	</header>
	</div>
);
}

export default Apps;
