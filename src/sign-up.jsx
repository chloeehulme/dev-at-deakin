// Sends welcome email for Dev@Deakin newsletter

import React from 'react';
import { useRef } from 'react';
import axios from 'axios'
import './css/sign-up.css';

function SignUp() {
    const form = useRef()

    const sendEmail = async (e) => {
        e.preventDefault();

        let userEmail = document.getElementById("email").value;

        var form = document.getElementById("myForm");
        form.reset();

        try {
            const response = await axios.post("http://localhost:8000/signup", {
            email: userEmail
            })

            console.log(response.data)

        } catch (error) {

            console.log("error: ", error)
        }
    };

    return (
        <div className='sign-up'>
            <section class="newsletter" id="newsletter-section">
                <p>sign up for our daily insider</p>
                <form id='myForm' ref={form} onSubmit={sendEmail}>
                    <input type="email"  name="email" id="email" required="required" placeholder="Your email..." />
                    <button type="submit">Subscribe</button> 
                </form>
            </section>
        </div>
    )
}

export default SignUp;