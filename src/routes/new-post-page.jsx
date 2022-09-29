// Puts together components that form the post page

import React from 'react';
import '../css/App.css';
import Header from '../header'
import Footer from '../footer'
import Banner from '../Banner'
import RadioGroup from '../radio'

function NewPostPage() {
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