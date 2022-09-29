// Deakin's safety and security reccomendations

import React, {useEffect} from 'react';
import Header from '../header';
import Footer from '../footer';
import { auth } from '../utilities/firebase';
import '../css/help.css';
import { useNavigate } from 'react-router-dom';

function Disclaimer() {

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
                    <h3 className='faq-header'>Safety and Security</h3>
                    <p className='help-summary'>The safety of our students, staff and visitors is extremely important to us. We have around-the-clock on-campus 
                    security services to ensure that you always get the help you need, when you need it.</p>
                    <p className='help-summary'>SafeZone is a free app for Deakin University students and staff that connects you directly to 
                    security services (24 hours a day). It's there for emergencies, but also for the times you just need some help. It might 
                    be an escort back to your car or assistance for those with a disability.</p>
                    <p className='help-summary'>Safer Community is a University-wide service aimed at keeping all campuses safe. 
                    We respond to all reports of behaviour that is concerning, inappropriate or threatening, and offer support to all parties involved.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Disclaimer;