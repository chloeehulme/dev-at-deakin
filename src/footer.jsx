// Provides links for footer routes

import React from 'react';
import FooterNav from './footer-nav';
import StayConnected from './stay-connected';
import BelowFooter from './below-footer';
import './css/footer.css';

function footer() {
    return (
        <div className='footer'>
            <footer>
                <div className="bottom-nav">
                    <div className="container">
                            <FooterNav
                                title = "Explore"
                                link1 = "/all-questions" text1 = "Questions"
                                link2 = "/all-articles" text2 = "Articles"
                                link3 = "/all-tutorials" text3 = "Tutorials"
                            />
                            <FooterNav
                                title = "Support"
                                link1 = "/frequently-asked-questions" text1 = "FAQs"
                                link2 = "/help" text2 = "Help"
                                link3 = "/contact" text3 = "Contact"
                            />
                            <StayConnected
                                title = "Stay Connected"
                                link1 = "https://www.facebook.com/DeakinUniversity" src1 = {require("./images/facebook.png")} alt1 = ""
                                link2 = "https://twitter.com/Deakin?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" src2 = {require("./images/twitter.png")} alt2 = ""
                                link3 = "https://www.instagram.com/deakinuniversity/?hl=en" src3 = {require("./images/instagram.png")} alt3 = ""
                            />
                    </div>
                </div>
                <BelowFooter
                    title = "DEV@Deakin"
                    link1 = '/privacy' text1 = "Privacy"
                    link2 = '/disclaimer' text2 = "Disclaimer"
                    link3 = '/safety-and-security' text3 = "Safety and Security"
                />
            </footer>
        </div>
    )
}

export default footer;