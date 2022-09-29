// Template for contact details card

import React from 'react';
import './css/contact-card.css';

function Contact(props) {
    return (
        <div>
            <div className='contact-container'>
                <h3 className='contact-card-header'>{props.title}</h3>
                <h5>Call</h5>
                <p>{props.call}</p>
                <h5>Visit</h5>
                <p>{props.visit}</p>
                <h5>Mail</h5>
                <p>{props.mail}</p>
            </div>
        </div>
    )
}

export default Contact;