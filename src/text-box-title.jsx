// Template for titles above each text box on post page

import React from 'react';
import './css/text-box-title.css';

function text_box_title(props) {
    return (
        <div className="text-box-title">
            <h2>{props.text}</h2>
        </div>
    )
}

export default text_box_title;