// Creates an account from user input and saves to firebase

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../utilities/firebase';
import '../css/login-page.css'

function CreateAccount() {

    const navigate = useNavigate();

    const [contact, setContact] = useState({
        displayName: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const {displayName, email, password, confirm_password} = contact;

    console.log(contact);

    // Creates a user from email and password credentials. Confirms password and stores details in authentication and firestore on firebase.
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (password !== confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocFromAuth(user, {displayName});
            navigate('/');
        } catch (error) {
            console.log('error in creating user', error.message);
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
                <div className='form-section' style={{paddingTop: "20px"}}>
                    <h2 style={{fontSize: "20px", fontWeight: "normal"}}>Create Account</h2>
                    <form>
                        <div id='displayName'>
                            <input name='displayName' type='name' placeholder='Name' onChange={handleChange} value={contact.displayName}></input>
                        </div>
                        <div id='email'>
                            <input name='email' type='email' placeholder='Email' onChange={handleChange} value={contact.email}></input>
                        </div>
                        <div id='password'>
                            <input name='password' type='password' placeholder='Password' onChange={handleChange} value={contact.password}></input>
                        </div>
                        <div id='confirm_password'>
                            <input name='confirm_password' type='password' placeholder='Confirm password' onChange={handleChange} value={contact.confirm_password}></input>
                        </div>
                        <Link to='/'><button type='submit' className='sign-up' onClick={handleSubmit}>Create</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
  
export default CreateAccount;