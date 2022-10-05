// User login page.

import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login-page.css'
import {signInAuthUserWithEmailAndPassword} from '../utilities/firebase'
import {UserContext} from '../context/user.context'

function LoginPage() {

    const navigate = useNavigate();

    const {setCurrentUser} = useContext(UserContext)
    const [contact, setContact] = useState({
        email: '',
        password: ''
    })

    const {email, password} = contact;

    // Signs in user is credentials are validated, otherwise requests new credentials
    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user)
            navigate('/user-2FA');
        } catch (error) {
            console.log('error logging in', error.message);
            alert("Invalid username or password! Try again...")
        }
    }

    // Handles user input
    const handleChange = (e) => {
        const {name, value} = e.target
        setContact ((preValue)=>{  
        return {
        ...preValue,
        [name]: value
        }})
    }

    return (
        <div className='login-container'>
            <div className='login-banner'>
                <img src= {require("../images/deakin-emblem.png")} alt="" />
            </div>
            <div className='login-details'>
                <div className='form-section'>
                    <form onSubmit>
                        <div id='email'>
                            <input type='email'name='email' placeholder='Email' onChange={handleChange} value={contact.email}></input>
                        </div>
                        <div id='password'>
                            <input type='password'name='password' placeholder='Password' onChange={handleChange} value={contact.password}></input>
                        </div>
                    </form>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <button type='submit' className='login-button' onClick={handleSubmit}>Login</button>
                    </div>
                    <h2>Don't have an account? <Link to='/create-account' style={{textDecoration: "none"}}><span style={{color: "darkcyan"}}>Sign up!</span></Link></h2>
                    <div className='forgot-password'>
                        <Link to='/reset-password'><button className='sign-up' style={{width: "120px", fontSize: "8px"}}>Forgot Password</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default LoginPage;