// Banner template used on home page.

import React from 'react';
import './css/Banner.css';

function banner(props) {
    return (
        <div className='banner'>
            <div className='container'>
                <h2>{props.text}</h2>
            </div>
        </div>
    )
}

export default banner;