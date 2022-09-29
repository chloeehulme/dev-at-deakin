// FAQs page

import React, {useEffect} from 'react';
import { faker } from '@faker-js/faker'
import Header from '../header';
import FaqCard from '../faqCard';
import Footer from '../footer';
import '../css/FAQs.css';

function FAQs() {

    // Loads to top of page
    useEffect(() => {
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