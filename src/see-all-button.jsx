// Template for 'see all' button on home page

import React from 'react';
import './css/see-all-button.css';

function seeAllButton(props) {
    return (
        <div className='see-all-button'>
            <div className='container'>
                <button type='internal-link'>{props.text}</button>
            </div>
        </div>
    )
}

export default seeAllButton;