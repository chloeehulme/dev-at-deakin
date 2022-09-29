// Puts together components that form the post page

import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/App.css';
import { auth } from '../utilities/firebase';
import Header from '../header'
import Footer from '../footer'
import Banner from '../Banner'
import RadioGroup from '../radio'

function NewPostPage() {

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
    <div style={{marginTop: "125px"}}>
      <Header />
        <div className='first-banner'>
          <Banner 
            text = "New Post"
          />
        </div>
        <RadioGroup />
      <Footer />
    </div>
  );
}

export default NewPostPage;