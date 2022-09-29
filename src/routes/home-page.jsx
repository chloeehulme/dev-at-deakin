// The home page of Dev@Deakin.

import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/App.css';
import { auth } from '../utilities/firebase';
import Header from '../header'
import HeroImage from '../hero-image'
import SignUp from '../sign-up'
import Footer from '../footer'
import FeaturedArticles from '../FeaturedArticles'
import FeaturedTutorials from '../FeaturedTutorials';
import Featured from '../Featured'
import SeeAllButton from '../see-all-button'

function HomePage() {

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
            <Header />
            <HeroImage />
            <Featured 
                text = "Featured Articles" 
            />
            <FeaturedArticles />
            <Link to = '/all-articles'> 
                <SeeAllButton 
                    text = "See all articles"
                />
            </Link>
            <Featured 
                text = "Featured Tutorials"
            />
            <FeaturedTutorials />
            <Link to = '/all-tutorials'> 
                <SeeAllButton 
                    text = "See all tutorials"
                />
            </Link>
            <SignUp />
            <Footer />
        </div>
    );
}

export default HomePage;
