// Sends a uniqye 6 digit code to a users email and verifies that the entered code matches the sent code. The code will become invalid after 10 mintues.

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../utilities/firebase'
import emailjs from '@emailjs/browser'
import '../css/login-page.css'
import '../css/verify.css'

var verficationCode;

function ResetPassword() {

    const navigate = useNavigate();
    const user = auth.currentUser;

    // Sends code via email on page load, navigates back to login page if no authorised user detected
    useEffect(() => {
        if (auth.currentUser == null)
        {
            navigate('/')
        }
        
        sendEmail();
    }, [])

    const [count, setTimer] = useState({
        minutes: 10,
        seconds: 0
    })

    const {minutes, seconds} = count;

    // Creates a 10 minute countdown timer, after which the code will change and thus the code emailed to user will become invalid
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0 ){
                setTimer(({minutes: minutes, seconds: seconds - 1}));
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    verficationCode = Math.floor(100000000 + Math.random() * 900000000);
                    navigate('/')
                }
                else {
                    setTimer(({
                        minutes: minutes - 1, 
                        seconds: 59
                    }));
                    console.log(minutes, seconds);
                }
            }
        }, 1000);

        return () => {clearInterval(interval)}
    }, [count]);

    const [input, setContact] = useState({
        code: '',
    })

    const {code} = input;

    // Sends a random 6 digit code to user's email via EmailJS
    function sendEmail() {

        verficationCode = Math.floor(100000 + Math.random() * 900000);

        var contactParams = {
            user_email: user.email,
            verification_code: verficationCode
        };

        emailjs.send(
            'service_rc7amr7', 
            'template_pe995mk', 
            contactParams, 
            'AnUKOjuV8Hm6r-AIE'
        )
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    // Checks whether the code entered by the user matches the code generated on page load
    const verifyCode = (e) => {
        e.preventDefault();

        if (code.toString() === verficationCode.toString()) {
            try {
                navigate('/home-page');
            } catch (error) {
                console.log('error in verifying account', error.message);
            }
        }
        else {
            alert("Incorrect verification code!");
            auth.signOut();
            navigate('/');
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
                        <h2 className='verify-heading'>Verify it's you...</h2>
                        <div style={{width: "250px"}}>
                            <h2 style={{marginTop: "20px", fontSize: "12px"}}>We've sent a unique code to your email, enter it below to verify it's you.</h2>
                        </div>
                    </div>
                    <form onSubmit={verifyCode}>
                        <div className='code-input-section'>
                            <input className='code-input' type="code" name="code" required="required" placeholder="Your code..." onChange={handleChange} value={input.code}/>
                            <button type='submit' className='sign-up code-input' onClick={verifyCode}>Verify</button>
                        </div>
                    </form>
                    <h1 style={{fontSize: "11px", fontWeight: "normal", textAlign: "center"}}>CODE VALID FOR: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                </div>
            </div>
        </div>
    );
}
  
export default ResetPassword;