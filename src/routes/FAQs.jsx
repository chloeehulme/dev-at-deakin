// FAQs page

import React, {useEffect} from 'react';
import { auth } from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker'
import Header from '../header';
import FaqCard from '../faqCard';
import Footer from '../footer';
import '../css/FAQs.css';

function FAQs() {

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
                    <h3 className='faq-header'>Frequently Asked Questions</h3>
                    <FaqCard question={faker.lorem.words() + '?'} answer={faker.lorem.sentence()}/>
                    <FaqCard question={faker.lorem.words() + '?'} answer={faker.lorem.sentence()}/>
                    <FaqCard question={faker.lorem.words() + '?'} answer={faker.lorem.sentence()}/>
                    <FaqCard question={faker.lorem.words() + '?'} answer={faker.lorem.sentence()}/>
                    <FaqCard question={faker.lorem.words() + '?'} answer={faker.lorem.sentence()}/>
                    <FaqCard question={faker.lorem.words() + '?'} answer={faker.lorem.sentence()}/>
                    <FaqCard question={faker.lorem.words() + '?'} answer={faker.lorem.sentence()}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FAQs;