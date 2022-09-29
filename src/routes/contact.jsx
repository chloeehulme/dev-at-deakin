// Holds Deakin's contact information

import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utilities/firebase';
import Header from '../header';
import Footer from '../footer';
import ContactCard from '../contact-card'
import '../css/contact-card.css';


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
                <div className='faq-container' style={{width: "80%", paddingLeft: "100px"}}>
                    <h3 className='faq-header' style={{marginLeft: "0px"}}>Contact</h3>
                    <div className='contact-cards'>
                        <ContactCard 
                            title='Melbourne Burwood Campus'
                            call='+61 3 9244 6100' 
                            visit='221 Burwood Highway Burwood VIC 3125 Australia' 
                            mail='Deakin University 221 Burwood Highway Burwood VIC 3125 Australia'
                        />
                        <ContactCard 
                            title='Geelong Waurn Ponds Campus'
                            call='+61 3 5227 1100' 
                            visit='75 Pigdons Road Waurn Ponds VIC 3216 Australia' 
                            mail='Deakin University Locked Bag 20000 Geelong VIC 3220 Australia'
                        />
                    </div>
                    <div className='contact-cards'>
                        <ContactCard 
                            title='Geelong Waterfront Campus'
                            call='+61 3 5227 1100' 
                            visit='1 Gheringhap Street Geelong VIC 3220 Australia' 
                            mail='Deakin University Locked Bag 20001 Geelong VIC 3220 Australia'
                        />
                        <ContactCard 
                            title='Warrnambool Campus'
                            call='+61 3 5563 3100' 
                            visit='Princes Highway Warrnambool VIC 3280 Australia' 
                            mail='Deakin University PO Box 423 Warrnambool VIC 3280 Australia'
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Help;