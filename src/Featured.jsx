// Template for 'Featured' text on home page

import React from 'react';
import './css/Featured.css';

function featured(props) {
    return (
        <div className='featured'>
            <div className='container'>
                <h2>{props.text}</h2>
            </div>
        </div>
    )
}

export default featured;