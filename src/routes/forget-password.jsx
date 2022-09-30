// Allows user to reset their password

import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import {sendAuthUserPasswordResetEmail} from '../utilities/firebase'
import '../css/login-page.css'

function ResetPassword() {

    const navigate = useNavigate();

    const [contact, setContact] = useState({
        email: ''
    })

    const {email} = contact;

    // Sends forgotten password email
    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await sendAuthUserPasswordResetEmail(email);
            console.log(response);
            navigate('/');
        } catch (error) {
            console.log('error resetting password', error.message);
            alert("Could not send link! Try again...")
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
                <div className='form-section' style={{paddingTop: "60px"}}>
                    <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
                        <h3 style={{fontWeight: "normal" }}>Reset your account's password</h3>
                        <div style={{width: "250px"}}>
                            <h2 style={{marginTop: "20px", fontSize: "12px"}}>Enter your email and we'll send you a link to reset your password.</h2>
                        </div>
                    </div>
                    <form onSubmit>
                        <div id='email'>
                            <input type='email'name='email' placeholder='Email' onChange={handleChange} value={contact.email}></input>
                        </div>
                    </form>
                    <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
                        <button type='submit' className='login-button' onClick={handleSubmit}>Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default ResetPassword;