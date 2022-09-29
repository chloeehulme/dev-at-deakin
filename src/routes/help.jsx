// Deakin's help page

import React, {useEffect} from 'react';
import Header from '../header';
import { faker } from '@faker-js/faker'
import { useNavigate } from 'react-router-dom';
import { auth } from '../utilities/firebase';
import Footer from '../footer';
import '../css/help.css';

function Help() {

    const navigate = useNavigate()

    // Loads to top of page, navigates back to login page if no authorised user detected
    useEffect(() => {
        if (auth.currentUser == null)
        {
            navigate('/')
        }

        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <div className='faqs'>
                <Header />
                <div className='faq-container'>
                    <h3 className='faq-header'>Help</h3>
                    <p className='help-summary'>{faker.lorem.paragraphs()}</p>
                    <p className='help-summary'>{faker.lorem.paragraphs()}</p>
                    <p className='help-summary'>{faker.lorem.paragraphs()}</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Help;