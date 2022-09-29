// Sends welcome email for Dev@Deakin newsletter

import React from 'react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser'
import './css/sign-up.css';

function SignUp() {
    const form = useRef()
    const sendEmail = (e) => {
        e.preventDefault();

    let userEmail = document.getElementById("email").value;

    var contactParams = {
        user_email: userEmail
    };

    // Gets user details and sends email
        emailjs.send(
            'service_rc7amr7', 
            'template_fkrxh4k', 
            contactParams, 
            'AnUKOjuV8Hm6r-AIE'
        )
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    };

    return (
        <div className='sign-up'>
            <section class="newsletter" id="newsletter-section">
                <p>sign up for our daily insider</p>
                <form ref={form} onSubmit={sendEmail}>
                    <input type="email"  name="email" id="email" required="required" placeholder="Your email..." />
                    <button type="submit">Subscribe</button> 
                </form>
            </section>
        </div>
    )
}

export default SignUp;