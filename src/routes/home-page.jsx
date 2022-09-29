// The home page of Dev@Deakin.

import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';
import Header from '../header'
import HeroImage from '../hero-image'
import SignUp from '../sign-up'
import Footer from '../footer'
import FeaturedArticles from '../FeaturedArticles'
import FeaturedTutorials from '../FeaturedTutorials';
import Featured from '../Featured'
import SeeAllButton from '../see-all-button'

function HomePage() {

    // Loads to top of page
    useEffect(() => {
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
