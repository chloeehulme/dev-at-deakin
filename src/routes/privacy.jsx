// Deakings privacy policies

import React, {useEffect} from 'react';
import Header from '../header';
import Footer from '../footer';
import '../css/help.css';

function Privacy() {

    // Loads to top of page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <div className='faqs'>
                <Header />
                <div className='faq-container'>
                    <h3 className='faq-header'>Privacy</h3>
                    <p className='help-summary'>The way we handle personal information or requests for personal information 
                    is outlined below.Deakin staff, students and alumni should also refer to the Privacy Statements,
                     which contain information and specific detail regarding how we collect and manage your personal information.</p>
                    <p className='help-summary'>Deakin is committed to responsible collection and management of personal and health
                    information (referred to in this statement as personal information) consistent with the Privacy and Data
                    Protection Act 2014 (Vic), the Health Records Act 2001 (Vic) and our Privacy Policy. All areas of Deakin 
                    treat personal information and health information in accordance with our Privacy Policy.</p>
                    <p className='help-summary'>When you visit our site, Deakin may collect your personal information as 
                    well as data about your interaction with our website.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Privacy;