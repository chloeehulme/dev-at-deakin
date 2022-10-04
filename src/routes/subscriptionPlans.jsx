// Deakin's help page

import React, {useEffect} from 'react';
import Header from '../header';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../utilities/firebase';
import Footer from '../footer';
import Banner from '../Banner';
import '../css/subscription-plans.css';

function SubscriptionPlan() {

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
            <div>
                <Header />
                <div style={{marginBottom: "130px"}}></div>
                <Banner text="Plan Options..."/>
                <div style={{width:"50%", marginLeft:"320px", marginTop: "100px", marginBottom: "100px"}}>
                    <div style={{display: "flex", justifyContent: 'space-between'}}>
                        <div className='faq-card-container subscription-card'>
                                <h3 className='sub-header'>Free Plan</h3>
                                <div style={{fontSize:"12px"}}>
                                    Includes all basic features within the Dev@Deakin site.
                                </div>
                        </div>
                        <Link to='/payment' style={{textDecoration: "none"}}>
                            <div className='faq-card-container subscription-card premium-card' >
                                    <h3 className='sub-header' >Premium Plan</h3>
                                    <div style={{fontSize:"12px", color:"black"}}>
                                        Access to premium features such as themes, banners, content control and more!
                                    </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SubscriptionPlan;