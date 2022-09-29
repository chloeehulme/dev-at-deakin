// Deakin's disclaimer

import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utilities/firebase';
import Header from '../header';
import Footer from '../footer';
import '../css/help.css';

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
                    <h3 className='faq-header'>Disclaimer</h3>
                    <p className='help-summary'>Please read this disclaimer carefully before accessing, using or participating in this website and its contents.</p>
                    <p className='help-summary'>Deakin University has taken all reasonable measures to ensure that material contained in this website is correct.
                     However, the university gives no warranty and accepts no responsibility for the accuracy or the completeness 
                     of the material; no reliance should be made by any user on the material. The user should check for confirmation with 
                     the originating or authorising faculty, department or other body; and the university reserves the right at
                      any time to make changes, as it deems appropriate.</p>
                    <p className='help-summary'>The university provides external links as a service to users of its website. In providing an
                     external link the university does not accept responsibility for, or endorse, the content or condition of any linked site.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Disclaimer;