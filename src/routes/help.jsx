// Deakin's help page

import React, {useEffect} from 'react';
import Header from '../header';
import { faker } from '@faker-js/faker'
import Footer from '../footer';
import '../css/help.css';

function Help() {

    // Loads to top of page
    useEffect(() => {
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