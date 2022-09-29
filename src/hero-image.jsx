// Template for website hero-image section

import React from 'react';
import './css/hero-image.css';

function heroImage() {
    return (
        <div className='hero-image'>
            <div className='container'>
                <img src= {require("./images/hero-image.jpeg")} alt="" />
            </div>
        </div>
    )
}

export default heroImage;